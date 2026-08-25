"use client";
import { useState } from "react";
import { Package, Mail, Lock } from "lucide-react";
import { loginRequest } from "../api";

interface Props {
  onLogin: (role: string) => void;
}

export function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!email || !pw) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await loginRequest(email, pw);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.access_token);
        localStorage.setItem("admin_role", data.role);
        localStorage.setItem("admin_email", email);
        setError(null);
        onLogin(data.role);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-white rounded-[2rem] p-10 w-full max-w-sm shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#3de0be] flex items-center justify-center mb-6">
          <Package className="w-7 h-7 text-slate-900" />
        </div>
        <h1 className="text-2xl font-heading font-black text-slate-900 mb-1">Admin Access</h1>
        <p className="text-slate-500 text-sm mb-8">SquarePack Dashboard</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#28b098]/30 transition-all ${
                error ? "border-red-400 bg-red-50" : "border-slate-200"
              }`}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#28b098]/30 transition-all ${
                error ? "border-red-400 bg-red-50" : "border-slate-200"
              }`}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs font-semibold -mt-2">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#3de0be] hover:bg-[#35d1b1] disabled:opacity-60 text-slate-900 font-bold py-3.5 rounded-xl transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}