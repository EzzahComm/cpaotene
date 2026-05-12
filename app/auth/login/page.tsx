"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Check if returning from email link
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
    setMessage("");

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

      setEmailSent(true);
      setMessage(
        "Check your email for a login link. The link will expire in 24 hours."
      );
      form.reset();
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            CPA OTENE & ASSOCIATES
          </h1>
          <p className="mt-2 text-gray-600">Client Portal Login</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {emailSent ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-green-900 font-semibold">
                  Check Your Email
                </h3>
                <p className="text-sm text-green-700 mt-1">{message}</p>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Didn't receive the email?</p>
                <button
                  onClick={() => {
                    setEmailSent(false);
                    form.reset();
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium mt-1"
                >
                  Try another email
                </button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>
              </form>
            </Form>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Need help?</span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center text-sm text-gray-600">
            <p>
              New to our portal?{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Get started
              </Link>
            </p>
            <p className="mt-2">
              Have questions?{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Email: <a href="mailto:info@cpaotene.com" className="font-medium">
              info@cpaotene.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+254747515972" className="font-medium">
              +254 747 515 972
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
