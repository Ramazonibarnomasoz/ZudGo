import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";
import { MobileShell } from "@/components/MobileShell";
import { Toaster } from "@/components/ui/sonner";

function NotFound() {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-semibold text-white">404</h1>
        <p className="mt-2 text-sm text-white/60">Screen not found</p>
        <a href="/" className="mt-6 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#141E30]">
          Go home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex h-full items-center justify-center p-6 text-center">
      <div>
        <h2 className="font-display text-xl font-semibold text-white">Something went wrong</h2>
        <p className="mt-2 text-sm text-white/60">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#141E30]">
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "ZudGo — Fast food delivery in Tajikistan" },
      { name: "description", content: "ZudGo is a premium food delivery app for Tajikistan. Fast delivery from the best restaurants, real-time tracking, and easy payments." },
      { name: "theme-color", content: "#141E30" },
      { property: "og:title", content: "ZudGo — Fast food delivery in Tajikistan" },
      { property: "og:description", content: "Order from the best restaurants in Tajikistan with real-time tracking and easy payments." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
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
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <MobileShell>
          <Outlet />
        </MobileShell>
        <Toaster position="top-center" />
      </I18nProvider>
    </QueryClientProvider>
  );
}
