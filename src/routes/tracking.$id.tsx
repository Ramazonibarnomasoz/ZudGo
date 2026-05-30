import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { formatPrice } from "@/lib/data";
import { Bike, Check, ChefHat, MapPin, Phone, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/tracking/$id")({ component: Tracking });

function Tracking() {
  const { id } = Route.useParams();
  const { t } = useI18n();
  const navigate = useNavigate();
  const order = useApp((s) => s.orders.find((o) => o.id === id));
  const [eta, setEta] = useState(28);

  useEffect(() => {
    const i = setInterval(() => setEta((e) => Math.max(2, e - 1)), 5000);
    return () => clearInterval(i);
  }, []);

  if (!order) {
    return <Screen title={t("tracking")} back="/orders"><div className="text-white/60">Order not found</div></Screen>;
  }

  const steps = [
    { key: "preparing", label: "Order received", Icon: Check },
    { key: "preparing", label: "Preparing your food", Icon: ChefHat },
    { key: "on_the_way", label: "On the way", Icon: Bike },
    { key: "delivered", label: "Delivered", Icon: MapPin },
  ];
  const activeIdx = order.status === "preparing" ? 1 : order.status === "on_the_way" ? 2 : 3;

  return (
    <Screen title={t("tracking")} back="/orders">
      {/* Map mock */}
      <div className="relative h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2a44] to-[#0c1424] shadow-soft">
        <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 240">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="240" fill="url(#grid)" />
          <path d="M40,180 Q140,80 240,140 T380,60" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" fill="none" strokeDasharray="6 6" />
          <circle cx="40" cy="180" r="8" fill="#fff" />
          <circle cx="380" cy="60" r="10" fill="#35577D" stroke="#fff" strokeWidth="2" />
        </svg>
        <div className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1.5 text-xs font-semibold text-white">
          {t("eta")}: {eta} {t("min")}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl glass-strong p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#35577D] to-[#141E30] text-white font-bold">
            JK
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">Jamshed K.</div>
            <div className="text-xs text-white/60">{t("driver")} · ZudGo</div>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
            <MessageCircle className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#141E30]">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-5 rounded-2xl glass p-4">
        <div className="text-xs uppercase tracking-widest text-white/40">Order #{order.id}</div>
        <div className="mt-4 space-y-4">
          {steps.map((s, i) => {
            const done = i <= activeIdx;
            const active = i === activeIdx;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  done ? "bg-white text-[#141E30]" : "bg-white/10 text-white/40"
                } ${active ? "ring-2 ring-white/40 animate-shimmer" : ""}`}>
                  <s.Icon className="h-4 w-4" />
                </div>
                <div className={`text-sm ${done ? "font-semibold text-white" : "text-white/40"}`}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-2xl glass-strong p-4">
        <div className="text-xs uppercase tracking-widest text-white/40">{order.restaurantName}</div>
        <div className="mt-2 space-y-1.5">
          {order.items.map((it) => (
            <div key={it.id} className="flex justify-between text-sm text-white/80">
              <span>{it.qty}× {it.name}</span>
              <span>{formatPrice(it.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-base">
          <span className="text-white/60">{t("total")}</span>
          <span className="font-display font-bold text-white">{formatPrice(order.total)}</span>
        </div>
      </div>

      <button onClick={() => navigate({ to: "/home" })} className="mt-6 w-full rounded-full glass-strong py-4 text-sm font-semibold text-white">
        Back to home
      </button>
    </Screen>
  );
}
