import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Heart, Star, Clock, Bike, Share2 } from "lucide-react";
import { restaurants, dishes, formatPrice } from "@/lib/data";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/restaurant/$id")({ component: RestaurantPage });

function RestaurantPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { favorites, toggleFavorite } = useApp();

  const r = restaurants.find((x) => x.id === id);
  const menu = useMemo(() => dishes.filter((d) => d.restaurantId === id), [id]);
  const cats = useMemo(() => Array.from(new Set(menu.map((d) => d.category))), [menu]);
  const [cat, setCat] = useState(cats[0] ?? "");

  if (!r) {
    return (
      <div className="flex h-full items-center justify-center text-white/70">Restaurant not found</div>
    );
  }

  const isFav = favorites.includes(r.id);

  return (
    <div className="relative h-full overflow-y-auto no-scrollbar pb-32">
      {/* Cover */}
      <div className="relative h-64 w-full overflow-hidden">
        <img src={r.cover} alt={r.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#141E30]" />
        <div className="absolute left-4 right-4 top-12 flex items-center justify-between">
          <button onClick={() => navigate({ to: "/home" })} className="flex h-10 w-10 items-center justify-center rounded-full glass-strong">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full glass-strong">
              <Share2 className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => toggleFavorite(r.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full glass-strong"
            >
              <Heart className={`h-4 w-4 ${isFav ? "fill-red-400 text-red-400" : "text-white"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="-mt-10 px-5">
        <div className="rounded-3xl glass-strong p-5 shadow-glow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-white">{r.name}</h1>
              <p className="mt-1 text-sm text-white/60">{r.cuisine}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
              <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
              <span className="text-sm font-semibold text-white">{r.rating}</span>
              <span className="text-xs text-white/50">({r.reviews})</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 text-center">
            <div className="px-2">
              <div className="flex items-center justify-center gap-1 text-white/60"><Clock className="h-3 w-3" /></div>
              <div className="mt-1 text-sm font-semibold text-white">{r.deliveryMin} {t("min")}</div>
              <div className="text-[10px] text-white/40">Delivery</div>
            </div>
            <div className="px-2">
              <div className="flex items-center justify-center gap-1 text-white/60"><Bike className="h-3 w-3" /></div>
              <div className="mt-1 text-sm font-semibold text-white">{r.deliveryFee === 0 ? t("free") : formatPrice(r.deliveryFee)}</div>
              <div className="text-[10px] text-white/40">Fee</div>
            </div>
            <div className="px-2">
              <div className="text-white/60">⭐</div>
              <div className="mt-1 text-sm font-semibold text-white">{r.tags[0]}</div>
              <div className="text-[10px] text-white/40">Highlight</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar px-5 pb-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
              c === cat ? "bg-white text-[#141E30]" : "glass text-white/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Menu */}
      <div className="mt-3 px-5">
        <h2 className="font-display text-base font-semibold text-white">{cat}</h2>
        <div className="mt-3 space-y-3">
          {menu.filter((d) => d.category === cat).map((d) => (
            <Link
              key={d.id}
              to="/food/$id"
              params={{ id: d.id }}
              className="flex items-center gap-3 rounded-2xl glass p-2"
            >
              <img src={d.image} alt={d.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{d.name}</div>
                <div className="line-clamp-2 text-xs text-white/50">{d.description}</div>
                <div className="mt-1.5 text-sm font-bold text-white">{formatPrice(d.price)}</div>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-[#141E30]">+</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
