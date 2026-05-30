import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, Receipt, Heart, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export function BottomNav() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const cartCount = useApp((s) => s.cart.reduce((a, c) => a + c.qty, 0));

  const items = [
    { to: "/home", label: t("home"), Icon: Home },
    { to: "/search", label: t("search"), Icon: Search },
    { to: "/orders", label: t("orders"), Icon: Receipt },
    { to: "/favorites", label: t("favorites"), Icon: Heart },
    { to: "/profile", label: t("profile"), Icon: User },
  ];

  return (
    <>
      {cartCount > 0 && pathname !== "/cart" && pathname !== "/checkout" && (
        <Link
          to="/cart"
          className="absolute bottom-24 left-4 right-4 z-30 flex items-center justify-between rounded-2xl px-5 py-4 glass-strong shadow-glow animate-float-up"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#141E30] font-bold">{cartCount}</div>
            <div>
              <div className="text-sm font-medium text-white">{t("cart")}</div>
              <div className="text-xs text-white/60">View your order</div>
            </div>
          </div>
          <div className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#141E30]">→</div>
        </Link>
      )}
      <nav className="absolute bottom-0 left-0 right-0 z-20 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-3 mb-3 rounded-3xl glass-strong px-2 py-2 shadow-soft">
          <ul className="flex items-center justify-between">
            {items.map(({ to, label, Icon }) => {
              const active = pathname === to || (to === "/home" && pathname === "/");
              return (
                <li key={to} className="flex-1">
                  <Link
                    to={to}
                    className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-all ${
                      active ? "bg-white text-[#141E30]" : "text-white/70"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
