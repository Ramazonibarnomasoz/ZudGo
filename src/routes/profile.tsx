import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/lib/store";
import { useI18n, LANGS, type Lang } from "@/lib/i18n";
import {
  User, MapPin, Languages, Receipt, Heart, Bell, Gift, Star, LogOut, ChevronRight,
} from "lucide-react";
import logo from "@/assets/zudgo-logo.png";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const { phone, logout, address, orders } = useApp();

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  return (
    <>
      <Screen title={t("profile")} withNav>
        <div className="rounded-3xl glass-strong p-5 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#35577D] to-[#141E30]">
              <img src={logo} alt="" className="h-12 w-12" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-white">Guest User</div>
              <div className="text-sm text-white/60">{phone ?? "+992 ..."}</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Orders" value={orders.length} />
            <Stat label="Points" value={1250} />
            <Stat label="Saved" value="84 TJS" />
          </div>
        </div>

        <Group title="Account">
          <Row icon={<User className="h-5 w-5" />} label="Personal information" />
          <Row icon={<MapPin className="h-5 w-5" />} label={t("address")} value={address} />
          <Row icon={<Heart className="h-5 w-5" />} label={t("favorites")} to="/favorites" />
          <Row icon={<Receipt className="h-5 w-5" />} label={t("orderHistory")} to="/orders" />
        </Group>

        <Group title="Preferences">
          <div className="rounded-2xl glass">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="text-white/70"><Languages className="h-5 w-5" /></div>
              <div className="flex-1 text-sm text-white">{t("language")}</div>
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as Lang)}
                  className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    lang === l.code ? "bg-white text-[#141E30]" : "text-white/70"
                  }`}
                >
                  {l.flag} {l.native}
                </button>
              ))}
            </div>
          </div>
          <Row icon={<Bell className="h-5 w-5" />} label="Notifications" toggle />
        </Group>

        <Group title="Rewards">
          <Row icon={<Gift className="h-5 w-5" />} label="Promo codes" value="2 active" />
          <Row icon={<Star className="h-5 w-5" />} label="Refer & earn" value="+50 TJS" />
        </Group>

        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl glass py-4 text-sm font-semibold text-red-300"
        >
          <LogOut className="h-4 w-4" /> {t("logout")}
        </button>
      </Screen>
      <BottomNav />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white/5 py-3">
      <div className="font-display text-lg font-bold text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="mb-2 px-1 text-xs uppercase tracking-widest text-white/40">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({
  icon, label, value, to, toggle,
}: { icon: React.ReactNode; label: string; value?: string; to?: string; toggle?: boolean }) {
  const inner = (
    <div className="flex items-center gap-3 rounded-2xl glass px-4 py-3.5">
      <div className="text-white/70">{icon}</div>
      <div className="flex-1 text-sm text-white">{label}</div>
      {value && <div className="text-xs text-white/50">{value}</div>}
      {toggle ? (
        <div className="h-6 w-10 rounded-full bg-white/20 p-0.5">
          <div className="h-5 w-5 translate-x-4 rounded-full bg-white" />
        </div>
      ) : (
        <ChevronRight className="h-4 w-4 text-white/40" />
      )}
    </div>
  );
  if (to) return <a href={to}>{inner}</a>;
  return inner;
}
