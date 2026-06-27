import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// ─── Hardcoded admin credentials ──────────────────────────────────────────────
// Only this username + password can log in. Change these values to rotate access.
const ADMIN_USERNAME = "noori_admin";
const ADMIN_PASSWORD = "Ntr@8xQ2#Kv9!";
const SESSION_KEY = "nt_admin_session";
export const SESSION_TOKEN = "authenticated_noori_2026";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === SESSION_TOKEN;
}

export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: () => {
    if (isAuthenticated()) throw redirect({ to: "/admin" });
  },
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin sign in — Noori Transport" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Please enter your username and password");
      return;
    }
    setBusy(true);
    // Small artificial delay so it doesn't feel instant (security UX best practice)
    await new Promise((r) => setTimeout(r, 600));
    setBusy(false);

    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, SESSION_TOKEN);
      toast.success("Welcome back");
      navigate({ to: "/admin" });
    } else {
      toast.error("Invalid username or password");
    }
  }

  return (
    <div className="brand-selection grid min-h-screen w-full lg:grid-cols-[1.1fr_1fr]">
      {/* Visual side */}
      <aside className="relative hidden overflow-hidden bg-[color:var(--color-navy)] lg:block">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(241,90,36,0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08), transparent 60%)",
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </Link>

          <div className="max-w-md">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange)]">
              Noori Transport — CMS
            </div>
            <h1 className="mt-4 font-display text-[2.25rem] font-bold leading-[1.15]">
              <span className="bg-[color:var(--color-orange)] px-1 text-white box-decoration-clone leading-[1.3]">
                Manage every page of the website from one secure place.
              </span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Edit services, fleet, gallery, leadership, contact details and more — without touching code. Changes go live immediately after you confirm.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-orange)]">
                <Lock className="h-3.5 w-3.5" />
                Admin access only
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Sign in with your administrator username and password. Only authorised credentials grant access to the CMS.
              </p>
            </div>
          </div>

          <div className="text-[11px] uppercase tracking-wider text-white/40">
            Admin access only
          </div>
        </div>
      </aside>

      {/* Form side */}
      <main className="flex items-center justify-center bg-background p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-[color:var(--color-ink-soft)] lg:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to website
          </Link>

          <h2 className="font-display text-2xl font-bold text-[color:var(--color-navy)]">
            Admin sign in
          </h2>
          <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
            Enter your administrator credentials to access the CMS.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-ink-soft)]" />
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-9"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-ink-soft)]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-navy)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={busy}
              className="w-full bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90"
            >
              {busy ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
