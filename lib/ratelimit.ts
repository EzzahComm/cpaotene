/**
 * NEXUS Rate Limiting Utility
 * ─────────────────────────────────────────────────────────────────────────────
 * Uses Upstash Redis + @upstash/ratelimit for serverless-safe rate limiting.
 *
 * Graceful degradation: if UPSTASH_REDIS_REST_URL / TOKEN are not set,
 * rate limiting is bypassed (logs a warning in development).
 *
 * Limits are defined per-route so each endpoint has its own policy.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";

// ── Types ────────────────────────────────────────────────────────────────────

export interface RateLimitConfig {
  /** Max number of requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
  /** Human-readable label for error messages (e.g. "5 per 10 minutes") */
  label: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp (seconds)
}

// ── Per-route limit policies ─────────────────────────────────────────────────

export const RATE_LIMITS = {
  /** Contact form: 5 submissions per 10 minutes per IP */
  contact: { limit: 5, windowSeconds: 600, label: "5 per 10 minutes" },
  /** Newsletter: 3 subscriptions per hour per IP */
  newsletter: { limit: 3, windowSeconds: 3600, label: "3 per hour" },
  /** Career applications: 3 per hour per IP (CV uploads included) */
  careers: { limit: 3, windowSeconds: 3600, label: "3 per hour" },
  /** Service intake: 5 per 10 minutes per IP */
  intake: { limit: 5, windowSeconds: 600, label: "5 per 10 minutes" },
  /** AI chat: 30 messages per minute per IP (authenticated, but still capped) */
  aiChat: { limit: 30, windowSeconds: 60, label: "30 per minute" },
} satisfies Record<string, RateLimitConfig>;

// ── IP extraction ─────────────────────────────────────────────────────────────

export function getClientIp(request: NextRequest): string {
  // Vercel sets x-forwarded-for; fall back to a static string for local dev
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() ?? realIp ?? "127.0.0.1";
  return ip;
}

// ── Upstash sliding-window rate limiter ──────────────────────────────────────

let _ratelimiter: Map<string, ReturnType<typeof createSlidingWindow>> | null = null;

function createSlidingWindow(config: RateLimitConfig) {
  // We implement a lightweight sliding window using Upstash REST API directly
  // so we don't need to bundle the full SDK at build time. The SDK is still
  // the recommended approach — install @upstash/ratelimit + @upstash/redis.
  return config;
}

/**
 * Check whether a given IP has exceeded the rate limit for a named policy.
 *
 * Returns a RateLimitResult. If Upstash is not configured, always allows
 * the request (success: true) and logs a warning in non-production.
 */
export async function checkRateLimit(
  request: NextRequest,
  policy: RateLimitConfig
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[NEXUS RateLimit] UPSTASH_REDIS_REST_URL / TOKEN not set — " +
        "rate limiting is disabled. Set these env vars in production."
      );
    }
    return {
      success: true,
      limit: policy.limit,
      remaining: policy.limit,
      reset: Math.floor(Date.now() / 1000) + policy.windowSeconds,
    };
  }

  const ip = getClientIp(request);
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - policy.windowSeconds;
  const key = `rl:${ip}:${policy.limit}:${policy.windowSeconds}`;

  try {
    // Sliding window via sorted set (ZRANGEBYSCORE + ZADD + ZREMRANGEBYSCORE)
    // Uses Upstash pipeline to reduce round-trips
    const pipeline = [
      ["ZREMRANGEBYSCORE", key, "-inf", windowStart],
      ["ZADD", key, now, `${now}-${Math.random()}`],
      ["ZCARD", key],
      ["EXPIRE", key, policy.windowSeconds],
    ];

    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pipeline),
    });

    if (!res.ok) {
      console.error("[NEXUS RateLimit] Upstash error:", res.status);
      // Fail open — allow request if Redis is unreachable
      return { success: true, limit: policy.limit, remaining: 1, reset: now + policy.windowSeconds };
    }

    const results = await res.json();
    const count: number = results[2]?.result ?? 0;
    const remaining = Math.max(0, policy.limit - count);
    const reset = now + policy.windowSeconds;

    return {
      success: count <= policy.limit,
      limit: policy.limit,
      remaining,
      reset,
    };
  } catch (err) {
    console.error("[NEXUS RateLimit] Unexpected error:", err);
    // Fail open
    return { success: true, limit: policy.limit, remaining: 1, reset: now + policy.windowSeconds };
  }
}

// ── Response helper ───────────────────────────────────────────────────────────

/**
 * Returns a 429 Too Many Requests response with standard rate-limit headers.
 */
export function rateLimitResponse(result: RateLimitResult, policyLabel: string): NextResponse {
  return NextResponse.json(
    {
      error: "Too many requests",
      message: `Rate limit exceeded. You are allowed ${policyLabel}. Please wait before trying again.`,
      retryAfter: result.reset - Math.floor(Date.now() / 1000),
    },
    {
      status: 429,
      headers: {
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(result.reset),
        "Retry-After": String(result.reset - Math.floor(Date.now() / 1000)),
      },
    }
  );
}

/**
 * Convenience: run a rate limit check and return a ready-to-use 429 if exceeded,
 * or null if the request is within limits.
 *
 * Usage:
 *   const limited = await withRateLimit(request, RATE_LIMITS.contact);
 *   if (limited) return limited;
 */
export async function withRateLimit(
  request: NextRequest,
  policy: RateLimitConfig
): Promise<NextResponse | null> {
  const result = await checkRateLimit(request, policy);
  if (!result.success) {
    return rateLimitResponse(result, policy.label);
  }
  return null;
}
