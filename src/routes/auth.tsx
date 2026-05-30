import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/zudgo-logo.png";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({ component: Auth });

function Auth() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const send = () => {
    if (phone.replace(/\D/g, "").length < 9) {
      toast.error("Enter a valid phone number");
      return;
    }
    sessionStorage.setItem("zudgo.pendingPhone", `+992${phone.replace(/\D/g, "")}`);
    navigate({ to: "/otp" });
  };

  return (
    <div className="flex h-full flex-col px-6 pt-16 pb-8">
      <img src={logo} alt="ZudGo" className="mx-auto h-20 w-20" />
      <h2 className="mt-6 text-center font-display text-2xl font-bold text-white">
        {t("signIn")} / {t("signUp")}
      </h2>
      <p className="mt-2 text-center text-sm text-white/60">{t("phoneNumber")}</p>

      <div className="mt-10">
        <div className="flex items-center gap-2 rounded-2xl glass-strong px-4 py-4">
          <div className="flex items-center gap-2 border-r border-white/15 pr-3">
            <span className="text-xl">🇹🇯</span>
            <span className="font-semibold text-white">+992</span>
          </div>
          <input
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
            placeholder="00 000 0000"
            className="flex-1 bg-transparent text-lg font-medium text-white placeholder:text-white/30 outline-none"
          />
        </div>
        <p className="mt-3 text-xs text-white/40">
          We'll send a verification code via SMS to your phone.
        </p>
      </div>

      <button
        onClick={send}
        className="mt-auto rounded-full bg-white py-4 font-semibold text-[#141E30] shadow-glow disabled:opacity-50"
      >
        {t("sendCode")}
      </button>
    </div>
  );
}
