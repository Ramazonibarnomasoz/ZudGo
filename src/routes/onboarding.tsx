import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { Zap, Store, MapPin, CreditCard, Sparkles } from "lucide-react";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

function Onboarding() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const setOnboardingDone = useApp((s) => s.setOnboardingDone);
  const [step, setStep] = useState(0);

  const steps = [
    { Icon: Zap, title: t("onb1Title"), sub: t("onb1Sub") },
    { Icon: Store, title: t("onb2Title"), sub: t("onb2Sub") },
    { Icon: MapPin, title: t("onb3Title"), sub: t("onb3Sub") },
    { Icon: CreditCard, title: t("onb4Title"), sub: t("onb4Sub") },
    { Icon: Sparkles, title: t("onb5Title"), sub: t("onb5Sub") },
  ];

  const finish = () => {
    setOnboardingDone(true);
    navigate({ to: "/auth" });
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else finish();
  };

  const { Icon, title, sub } = steps[step];

  return (
    <div className="flex h-full flex-col px-6 pt-12 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-8 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
        <button onClick={finish} className="text-sm text-white/60">{t("skip")}</button>
      </div>

      <div key={step} className="mt-12 flex flex-col items-center text-center animate-float-up">
        <div className="relative flex h-56 w-56 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#35577D]/40 to-transparent blur-2xl" />
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full glass-strong shadow-glow">
            <Icon className="h-20 w-20 text-white" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="mt-10 font-display text-3xl font-bold text-white">{title}</h2>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">{sub}</p>
      </div>

      <button
        onClick={next}
        className="mt-auto rounded-full bg-white py-4 font-semibold text-[#141E30] shadow-glow"
      >
        {step === steps.length - 1 ? t("getStarted") : t("next")}
      </button>
    </div>
  );
}
