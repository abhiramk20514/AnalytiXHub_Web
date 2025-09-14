import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Grid from "@/components/graphics/Grid";
import Aurora from "@/components/graphics/Aurora";
import Rays from "@/components/graphics/Rays";
import Noise from "@/components/graphics/Noise";
import LogoMark from "@/components/graphics/LogoMark";
import Wordmark from "@/components/graphics/Wordmark";
import { CheckCircle2 } from "lucide-react";

import { API_BASE_URL } from "@/config";

export default function Index() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    const count = Number(localStorage.getItem("loginCount") || 0) + 1;
    localStorage.setItem("loginCount", String(count));
    localStorage.setItem("lastLogin", String(Date.now()));
    localStorage.setItem("user", JSON.stringify({ username }));
    navigate("/landing");
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_bottom_right,theme(colors.slate.950),theme(colors.slate.900))]">
      <Grid />
      <Aurora />
      <Rays />
      <Noise />
      <div className="container flex min-h-screen items-center justify-center py-12">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <LogoMark className="h-8 w-8" />
              <Wordmark />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome to AnalytiX Hub
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to create a project or start a new analysis.
            </p>

            {/* 🔑 Username/Password login */}
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <label className="block text-sm font-medium">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="you@company.com"
              />
              <label className="block text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button type="submit" variant="gradient" className="mt-2 w-full">
                Sign in
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              <span>OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* 🔑 OAuth login */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() =>
                  (window.location.href = `${API_BASE_URL}/auth/google`)
                }
                className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
              >
                <span>Continue with Google</span>
              </button>
              <button
                onClick={() =>
                  (window.location.href = `${API_BASE_URL}/auth/github`)
                }
                className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
              >
                <span>Continue with GitHub</span>
              </button>
            </div>
          </div>

          {/* Right side info card */}
          <div className="hidden flex-col justify-center md:flex">
            <div className="rounded-xl bg-gradient-to-br from-sky-700/50 via-cyan-600/50 to-indigo-700/50 p-[2px]">
              <div className="rounded-[10px] bg-slate-900/50 p-6 backdrop-blur ring-1 ring-white/10">
                <h2 className="text-xl font-semibold text-white">
                  Why AnalytiX Hub?
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Create analyses in seconds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Upload files and get instant insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Track verbose steps and overall progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
