import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Search, Bell, Star, Clock, Bike } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { BottomNav } from "@/components/BottomNav";
import { Screen } from "@/components/Screen";
import { categories, restaurants, promotions, formatPrice, dishes } from "@/lib/data";

export const Route = createFileRoute("/home")({ component: Home });

function Home() {
  const { t } = useI18n();
  const address = useApp((s) => s.address);
  const popular = restaurants.slice(0, 4);
  const recommended = [...restaurants].sort((a, b) => b.rating - a.rating);
  const fast = restaurants.filter((r) => r.deliveryMin <= 28);
  const featured = dishes.slice(0, 6);

  return (
    <>
      <div className="relative h-full overflow-y-auto no-scrollbar pb-32">
        {/* Header */}
        <div className="relative px-5 pt-14 pb-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(53,87,125,0.5),transparent_60%)]" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50">{t("deliverTo")}</div>
              <button className="mt-1 flex items-center gap-1 text-white">
                <MapPin className="h-4 w-4" />
                <span className="font-display text-base font-semibold">{address}</span>
              </button>
            </div>
            <Link to="/profile" className="flex h-11 w-11 items-center justify-center rounded-full glass">
              <Bell className="h-5 w-5 text-white" />
            </Link>
          </div>

          <Link
            to="/search"
            className="relative mt-5 flex items-center gap-3 rounded-2xl glass-strong px-4 py-3.5"
          >
            <Search className="h-5 w-5 text-white/60" />
            <span className="text-sm text-white/50">{t("searchPlaceholder")}</span>
          </Link>
        </div>

        {/* Categories */}
        <Section title={t("categories")}>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                className="flex min-w-[80px] flex-col items-center gap-2 rounded-2xl glass px-4 py-3 active:scale-95 transition"
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-xs font-medium text-white/80">{c.name}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Promotions */}
        <Section title={t("promotions")}>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
            {promotions.map((p) => (
              <div
                key={p.id}
                className={`min-w-[280px] rounded-3xl bg-gradient-to-br ${p.color} p-5 shadow-soft border border-white/10`}
              >
                <div className="text-xs uppercase tracking-widest text-white/60">ZudGo</div>
                <div className="mt-2 font-display text-xl font-bold text-white">{p.title}</div>
                <div className="mt-1 text-sm text-white/70">{p.subtitle}</div>
                <button className="mt-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#141E30]">
                  Use offer
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* Popular restaurants */}
        <Section title={t("popular")} more>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-1">
            {popular.map((r) => (
              <Link
                key={r.id}
                to="/restaurant/$id"
                params={{ id: r.id }}
                className="min-w-[260px] overflow-hidden rounded-3xl glass shadow-soft"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img src={r.image} alt={r.name} className="h-full w-full object-cover" loading="lazy" />
                  {r.promo && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#141E30]">
                      {r.promo}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-display text-sm font-semibold text-white">{r.name}</div>
                    <div className="flex items-center gap-1 text-xs text-white">
                      <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
                      {r.rating}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-white/50">{r.cuisine}</div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-white/60">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.deliveryMin} {t("min")}</span>
                    <span className="flex items-center gap-1">
                      <Bike className="h-3 w-3" />
                      {r.deliveryFee === 0 ? t("free") : formatPrice(r.deliveryFee)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Featured dishes */}
        <Section title={t("featured")}>
          <div className="grid grid-cols-2 gap-3 px-5">
            {featured.map((d) => (
              <Link
                key={d.id}
                to="/food/$id"
                params={{ id: d.id }}
                className="overflow-hidden rounded-2xl glass shadow-soft"
              >
                <img src={d.image} alt={d.name} className="h-24 w-full object-cover" loading="lazy" />
                <div className="p-2.5">
                  <div className="text-xs font-semibold text-white line-clamp-1">{d.name}</div>
                  <div className="mt-1 text-[11px] text-white/50">{formatPrice(d.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Fast delivery */}
        <Section title={t("fastDelivery")}>
          <div className="px-5 space-y-3">
            {fast.map((r) => (
              <RestaurantRow key={r.id} r={r} />
            ))}
          </div>
        </Section>

        {/* Recommended */}
        <Section title={t("recommended")}>
          <div className="px-5 space-y-3">
            {recommended.slice(0, 4).map((r) => (
              <RestaurantRow key={r.id} r={r} />
            ))}
          </div>
        </Section>
      </div>
      <BottomNav />
    </>
  );
}

function Section({ title, children, more }: { title: string; children: React.ReactNode; more?: boolean }) {
  return (
    <section className="mt-2 mb-5">
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-display text-base font-semibold text-white">{title}</h2>
        {more && <button className="text-xs text-white/50">See all →</button>}
      </div>
      {children}
    </section>
  );
}

function RestaurantRow({ r }: { r: typeof restaurants[number] }) {
  const { t } = useI18n();
  return (
    <Link
      to="/restaurant/$id"
      params={{ id: r.id }}
      className="flex items-center gap-3 overflow-hidden rounded-2xl glass p-2"
    >
      <img src={r.image} alt={r.name} className="h-20 w-20 rounded-xl object-cover" loading="lazy" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-display text-sm font-semibold text-white">{r.name}</div>
          <div className="flex items-center gap-1 text-xs text-white">
            <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" /> {r.rating}
          </div>
        </div>
        <div className="text-xs text-white/50">{r.cuisine}</div>
        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-white/60">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.deliveryMin} {t("min")}</span>
          <span className="flex items-center gap-1">
            <Bike className="h-3 w-3" />
            {r.deliveryFee === 0 ? t("free") : `${r.deliveryFee} TJS`}
          </span>
        </div>
      </div>
    </Link>
  );
}
