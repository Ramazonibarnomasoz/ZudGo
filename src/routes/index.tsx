import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import logo from "@/assets/zudgo-logo.png";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Splash });

function Splash() {
  const navigate = useNavigate();
  const { authed, onboardingDone } = useApp();
  const { t } = useI18n();

  useEffect(() => {
    const id = setTimeout(() => {
      if (authed) navigate({ to: "/home" });
      else if (onboardingDone) navigate({ to: "/auth" });
      else navigate({ to: "/language" });
    }, 1900);
    return () => clearTimeout(id);
  }, [authed, onboardingDone, navigate]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(120,160,210,0.25),transparent_60%)]" />
      <img src={logo} alt="ZudGo" className="h-44 w-44 animate-logo-pulse" />
      <div className="mt-6 text-center animate-float-up" style={{ animationDelay: "0.3s" }}>
        <h1 className="font-display text-4xl font-bold text-gradient">ZudGo</h1>
        <p className="mt-2 text-sm tracking-[0.3em] text-white/60 uppercase">{t("appTagline")}</p>
      </div>
      <div className="absolute bottom-16 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/60 animate-shimmer"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
