import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/lib/store";
import { restaurants } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { Heart, Star, Clock } from "lucide-react";

export const Route = createFileRoute("/favorites")({ component: Favorites });

function Favorites() {
  const { t } = useI18n();
  const favs = useApp((s) => s.favorites);
  const list = restaurants.filter((r) => favs.includes(r.id));

  return (
    <>
      <Screen title={t("favorites")} withNav>
        {list.length === 0 ? (
          <div className="mt-24 flex flex-col items-center text-center text-white/60">
            <div className="flex h-20 w-20 items-center justify-center rounded-full glass">
              <Heart className="h-8 w-8" />
            </div>
            <p className="mt-4 font-display text-lg text-white">No favorites</p>
            <p className="mt-1 text-sm">Tap the heart on a restaurant to save it</p>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((r) => (
              <Link key={r.id} to="/restaurant/$id" params={{ id: r.id }} className="flex items-center gap-3 rounded-2xl glass p-2">
                <img src={r.image} className="h-20 w-20 rounded-xl object-cover" alt={r.name} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-white/50">{r.cuisine}</div>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-white/60">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" /> {r.rating}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {r.deliveryMin} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Screen>
      <BottomNav />
    </>
  );
}
