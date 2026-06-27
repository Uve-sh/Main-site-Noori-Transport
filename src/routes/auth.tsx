import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) throw redirect({ to: "/admin" });
  },
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin sign in — Noori Transport" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const credsSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Minimum 8 characters").max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Redirect away if a session appears mid-page (e.g. signup auto-login)
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        navigate({ to: "/admin" });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    navigate({ to: "/admin" });
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { emailRedirectTo: `${window.location.origin}/auth` },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Check your inbox to verify your email");
    setTab("login");
  }

  return (
    <div className="brand-selection grid min-h-screen w-full lg:grid-cols-[1.1fr_1fr]">
      {/* Visual + guide side */}
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

            {/* Admin login guide */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-orange)]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-orange)] text-[10px] font-bold text-white">i</span>
                How to access the admin
              </div>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-white/85">
                <li className="flex gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-white">1</span>
                  <span>Open the <span className="font-semibold text-white">Create account</span> tab and sign up with your authorised email and a password of at least 8 characters.</span>
                </li>
                <li className="flex gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-white">2</span>
                  <span>Check your inbox and click the verification link we send. Admin privileges are granted automatically the moment your email is verified.</span>
                </li>
                <li className="flex gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-white">3</span>
                  <span>Return here, switch to <span className="font-semibold text-white">Sign in</span>, enter the same email and password — you’ll land directly in the CMS dashboard.</span>
                </li>
              </ol>
              <p className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/55">
                Already have an account? Just use <span className="font-semibold text-white/80">Sign in</span>. Forgot your password? Contact your administrator to reset it.
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
            Use your authorised email to access the CMS.
          </p>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")} className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-ink-soft)]" />
                    <Input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      placeholder="you@nooritransport.in"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-ink-soft)]" />
                    <Input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@nooritransport.in"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-confirm">Confirm password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-[color:var(--color-navy)] text-white hover:bg-[color:var(--color-navy)]/90"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
                </Button>
                <p className="text-[11px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  Admin access is granted automatically when an authorised email is verified. Other accounts can sign up but will not be able to enter the CMS.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
