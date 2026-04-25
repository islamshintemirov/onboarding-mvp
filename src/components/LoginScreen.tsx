"use client";

import { useState } from "react";
import { Button, Card, Input, Label, TextField } from "@heroui/react";

interface User {
  id: string | null;
  email: string;
  fullName: string | null;
}

interface Props {
  onLogin: (user: User, access: string, refresh: string) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      onLogin(data.user, data.access, data.refresh);
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Jobescape</span>
          <p className="text-sm text-slate-500 mt-2">Sign in to your account to continue</p>
        </div>

        <Card variant="default" className="p-6">
          <Card.Content className="p-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <TextField
                value={email}
                onChange={setEmail}
                variant="primary"
                fullWidth
                isRequired
              >
                <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </TextField>

              <TextField
                value={password}
                onChange={setPassword}
                variant="primary"
                fullWidth
                isRequired
              >
                <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </TextField>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isDisabled={loading || !email || !password}
              >
                {loading ? "Signing in..." : "Sign in →"}
              </Button>
            </form>
          </Card.Content>
        </Card>

        <p className="text-center text-xs text-slate-400 mt-4">
          Use your Jobescape credentials to sign in.
        </p>
      </div>
    </div>
  );
}
