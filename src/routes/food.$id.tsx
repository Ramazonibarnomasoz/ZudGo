import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { dishes, restaurants, formatPrice } from "@/lib/data";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/food/$id")({ component: FoodPage });

function FoodPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const addToCart = useApp((s) => s.addToCart);
  const [qty, setQty] = useState(1);

  const d = dishes.find((x) => x.id === id);
  const r = d && restaurants.find((x) => x.id === d.restaurantId);
  if (!d || !r) return <div className="flex h-full items-center justify-center text-white/70">Not found</div>;

  const add = () => {
    addToCart(
      { id: d.id, name: d.name, price: d.price, image: d.image, restaurantId: r.id, restaurantName: r.name },
      qty,
    );
    toast.success(`${d.name} added to cart`);
    navigate({ to: "/restaurant/$id", params: { id: r.id } });
  };

  return (
    <div className="relative h-full overflow-y-auto no-scrollbar pb-32">
      <div className="relative h-72 w-full overflow-hidden">
        <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#141E30]" />
        <button onClick={() => navigate({ to: "/restaurant/$id", params: { id: r.id } })} className="absolute left-4 top-12 flex h-10 w-10 items-center justify-center rounded-full glass-strong">
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="-mt-8 rounded-t-[32px] bg-[#141E30] px-6 pt-6">
        <div className="text-xs uppercase tracking-widest text-white/50">{r.name}</div>
        <h1 className="mt-1 font-display text-2xl font-bold text-white">{d.name}</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{d.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/50">Price</div>
            <div className="font-display text-2xl font-bold text-white">{formatPrice(d.price * qty)}</div>
          </div>
          <div className="flex items-center gap-3 rounded-full glass-strong px-2 py-1.5">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-semibold text-white">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#141E30]">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
        <button onClick={add} className="w-full rounded-full bg-white py-4 font-semibold text-[#141E30] shadow-glow">
          {t("addToCart")} · {formatPrice(d.price * qty)}
        </button>
      </div>
    </div>
  );
}
