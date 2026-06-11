"use client";
import { useState } from "react";
import { Package } from "lucide-react";
import { loginRequest } from "../api";

interface Props {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: Props) {
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    try {
      const res = await loginRequest(pw);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.access_token);
        setPwError(false);
        onLogin();
      } else {
        setPwError(true);
      }
    } catch {
      setPwError(false);
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
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className={`px-4 py-3.5 rounded-xl border text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[#28b098]/30 transition-all ${
              pwError ? "border-red-400 bg-red-50" : "border-slate-200"
            }`}
          />
          {pwError && (
            <p className="text-red-500 text-xs font-semibold -mt-2">
              Incorrect password. Try again.
            </p>
          )}
          <button
            onClick={() => handleLogin()}
            className="bg-[#3de0be] hover:bg-[#35d1b1] text-slate-900 font-bold py-3.5 rounded-xl transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}