import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/otp")({ component: Otp });

function Otp() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const setAuthed = useApp((s) => s.setAuthed);
  const [code, setCode] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const phone = typeof window !== "undefined" ? sessionStorage.getItem("zudgo.pendingPhone") ?? "+992 ..." : "+992";

  useEffect(() => {
    toast("Demo OTP: 1234", { description: "Use this code to continue." });
  }, []);

  const onChange = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 3) refs.current[i + 1]?.focus();
  };

  const verify = () => {
    if (code.join("") !== "1234") {
      toast.error("Invalid code. Try 1234");
      return;
    }
    setAuthed(true, phone);
    navigate({ to: "/home" });
  };

  return (
    <div className="flex h-full flex-col px-6 pt-16 pb-8">
      <h2 className="text-center font-display text-2xl font-bold text-white">{t("verifyOtp")}</h2>
      <p className="mt-2 text-center text-sm text-white/60">
        {t("enterOtp")}<br />
        <span className="text-white">{phone}</span>
      </p>

      <div className="mt-12 flex justify-center gap-3">
        {code.map((c, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={c}
            onChange={(e) => onChange(i, e.target.value)}
            inputMode="numeric"
            className="h-16 w-14 rounded-2xl glass-strong text-center font-display text-2xl font-bold text-white outline-none focus:ring-2 focus:ring-white/40"
          />
        ))}
      </div>

      <button onClick={() => toast("Code resent (demo)")} className="mt-6 self-center text-sm text-white/60 underline">
        Resend code
      </button>

      <button
        onClick={verify}
        className="mt-auto rounded-full bg-white py-4 font-semibold text-[#141E30] shadow-glow"
      >
        {t("verify")}
      </button>
    </div>
  );
}
