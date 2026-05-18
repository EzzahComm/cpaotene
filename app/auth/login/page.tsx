"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Shield, Mail, CheckCircle2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/client-portal");
      }
    };
    handleAuthCallback();
  }, [supabase.auth, router]);

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSentEmail(data.email);
      setEmailSent(true);
      reset();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-royal-800 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-royal-500/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="login-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
        </svg>
      </div>

      <div className="relative w-full max-w-sm">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-royal-500 to-navy-700 rounded-xl flex items-center justify-center border border-white/10 shadow-enterprise-lg">
              <span className="text-gold-400 font-bold text-sm font-heading">CPA</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-white font-heading text-sm leading-tight">CPA OTENE</p>
              <p className="text-white/50 text-xs leading-tight">& Associates LLP</p>
            </div>
          </Link>
          <h1 className="text-2xl font-bold font-heading text-white mb-1">Client Portal</h1>
          <p className="text-white/50 text-sm">Sign in to access your account</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-enterprise-xl">
          {emailSent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-400/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-green-400" />
              </div>
              <h2 className="text-lg font-bold font-heading text-white mb-2">Check Your Email</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                We sent a magic link to{" "}
                <span className="text-gold-400 font-medium">{sentEmail}</span>.
                Click the link to sign in — it expires in 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEmailSent(false);
                  setSentEmail("");
                }}
                className="text-sm text-white/40 hover:text-white/70 transition-colors underline"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="text-xs font-medium text-white/60 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : (
                  <>
                    Send Magic Link <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-white/30">
                We'll email you a secure, passwordless sign-in link.
              </p>
            </form>
          )}
        </div>

        {/* Footer links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-white/40">
            New to our portal?{" "}
            <Link href="/contact" className="text-gold-400 hover:text-gold-300 transition-colors">
              Request access
            </Link>
          </p>
          <p className="text-xs text-white/40">
            Need help?{" "}
            <a href="mailto:info@cpaotene.co.ke" className="text-gold-400 hover:text-gold-300 transition-colors">
              info@cpaotene.co.ke
            </a>
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-white/25 text-xs">
          <Shield size={12} />
          <span>Secured by Supabase · End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
