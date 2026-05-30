import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { BottomNav } from "@/components/BottomNav";
import { restaurants, dishes, formatPrice } from "@/lib/data";

export const Route = createFileRoute("/search")({ component: SearchScreen });

function SearchScreen() {
  const { t } = useI18n();
  const [q, setQ] = useState("");

  const suggestions = ["Plov", "Kebab", "Pizza", "Sushi", "Burger", "Manti"];
  const filteredRestaurants = restaurants.filter((r) =>
    !q || r.name.toLowerCase().includes(q.toLowerCase()) || r.cuisine.toLowerCase().includes(q.toLowerCase()),
  );
  const filteredDishes = dishes.filter((d) => !q || d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="h-full overflow-y-auto no-scrollbar px-5 pt-14 pb-32">
        <div className="flex items-center gap-3 rounded-2xl glass-strong px-4 py-3">
          <SearchIcon className="h-5 w-5 text-white/60" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
          {q && (
            <button onClick={() => setQ("")}><X className="h-4 w-4 text-white/60" /></button>
          )}
        </div>

        {!q && (
          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-white/40">Suggestions</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="rounded-full glass px-4 py-2 text-xs text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {q && (
          <>
            <h3 className="mt-6 font-display text-sm font-semibold text-white">Restaurants</h3>
            <div className="mt-3 space-y-2">
              {filteredRestaurants.map((r) => (
                <Link
                  key={r.id}
                  to="/restaurant/$id"
                  params={{ id: r.id }}
                  className="flex items-center gap-3 rounded-2xl glass p-2"
                >
                  <img src={r.image} alt={r.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-white">{r.name}</div>
                    <div className="text-xs text-white/50">{r.cuisine}</div>
                  </div>
                </Link>
              ))}
              {!filteredRestaurants.length && <div className="text-sm text-white/40">No restaurants</div>}
            </div>
            <h3 className="mt-6 font-display text-sm font-semibold text-white">Dishes</h3>
            <div className="mt-3 space-y-2">
              {filteredDishes.map((d) => (
                <Link
                  key={d.id}
                  to="/food/$id"
                  params={{ id: d.id }}
                  className="flex items-center gap-3 rounded-2xl glass p-2"
                >
                  <img src={d.image} alt={d.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{d.name}</div>
                    <div className="text-xs text-white/50">{formatPrice(d.price)}</div>
                  </div>
                </Link>
              ))}
              {!filteredDishes.length && <div className="text-sm text-white/40">No dishes</div>}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </>
  );
}
