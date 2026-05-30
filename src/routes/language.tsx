import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";
import { Check } from "lucide-react";
import logo from "@/assets/zudgo-logo.png";

export const Route = createFileRoute("/language")({ component: LanguagePage });

function LanguagePage() {
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col px-6 pt-16 pb-8">
      <img src={logo} alt="ZudGo" className="mx-auto h-20 w-20" />
      <h2 className="mt-6 text-center font-display text-2xl font-bold text-white">{t("selectLanguage")}</h2>
      <p className="mt-2 text-center text-sm text-white/60">Choose your preferred language</p>

      <div className="mt-8 space-y-3">
        {LANGS.map((l) => {
          const active = lang === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setLang(l.code as Lang)}
              className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 transition-all ${
                active ? "bg-white text-[#141E30]" : "glass text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{l.flag}</span>
                <div className="text-left">
                  <div className="font-semibold">{l.native}</div>
                  <div className={`text-xs ${active ? "text-[#35577D]" : "text-white/50"}`}>{l.label}</div>
                </div>
              </div>
              {active && <Check className="h-5 w-5" />}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate({ to: "/onboarding" })}
        className="mt-auto rounded-full bg-white py-4 font-semibold text-[#141E30] shadow-glow"
      >
        {t("continue")}
      </button>
    </div>
  );
}
