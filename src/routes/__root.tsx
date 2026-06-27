import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-20">
      <div className="max-w-md text-center">
        <div className="font-display text-7xl font-bold text-[color:var(--color-navy)]">404</div>
        <h1 className="mt-4 font-display text-xl font-semibold text-[color:var(--color-navy)]">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[color:var(--color-orange)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-orange-light)]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-20">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold text-[color:var(--color-navy)]">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-[color:var(--color-orange)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold text-[color:var(--color-navy)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Noori Transport Co. — Delivering Trust. Driving Excellence." },
      {
        name: "description",
        content:
          "Bharuch-based road transportation specialist for government, mining, hazardous cargo and industrial clients across India.",
      },
      { name: "theme-color", content: "#0D3B66" },
      { property: "og:title", content: "Noori Transport Co. — Delivering Trust. Driving Excellence." },
      {
        property: "og:description",
        content:
          "Road transportation and logistics for government, mining and industrial clients across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Noori Transport Co. — Delivering Trust. Driving Excellence." },
      { name: "description", content: "Noori Transport: Corporate Edge is a premium corporate logistics website showcasing established transport services." },
      { property: "og:description", content: "Noori Transport: Corporate Edge is a premium corporate logistics website showcasing established transport services." },
      { name: "twitter:description", content: "Noori Transport: Corporate Edge is a premium corporate logistics website showcasing established transport services." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/760d8b51-6f93-4637-9f3c-63f8eff14d06/id-preview-814af032--a3ef4376-e04f-4e5b-a17b-f958890e4627.lovable.app-1782503679643.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/760d8b51-6f93-4637-9f3c-63f8eff14d06/id-preview-814af032--a3ef4376-e04f-4e5b-a17b-f958890e4627.lovable.app-1782503679643.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundWithChrome,
  errorComponent: ErrorComponent,
});

function NotFoundWithChrome() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1"><NotFoundComponent /></main>
      <Footer />
    </div>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideChrome = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void router.invalidate();
      if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        {!hideChrome && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!hideChrome && <Footer />}
      </div>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
