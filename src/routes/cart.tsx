import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { formatPrice } from "@/lib/data";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart } = useApp();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const applyPromo = () => {
    if (promo.toUpperCase() === "ZUDGO20") {
      setDiscount(Math.round(subtotal * 0.2));
      toast.success("20% promo applied!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  return (
    <Screen title={t("cart")} back="/home">
      {cart.length === 0 ? (
        <div className="mt-24 text-center text-white/60">
          <p className="font-display text-lg text-white">Your cart is empty</p>
          <p className="mt-1 text-sm">Add dishes from any restaurant</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-2xl glass p-2.5">
                <img src={c.image} alt={c.name} className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{c.name}</div>
                  <div className="text-xs text-white/50">{c.restaurantName}</div>
                  <div className="mt-1 text-sm font-bold text-white">{formatPrice(c.price * c.qty)}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 rounded-full bg-white/10 px-1 py-1">
                    <button onClick={() => updateQty(c.id, c.qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-full text-white">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-sm text-white">{c.qty}</span>
                    <button onClick={() => updateQty(c.id, c.qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#141E30]">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(c.id)} className="text-white/40">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-2xl glass px-4 py-3">
            <Tag className="h-4 w-4 text-white/60" />
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder={t("promo")}
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
            <button onClick={applyPromo} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#141E30]">
              Apply
            </button>
          </div>

          <div className="mt-5 rounded-2xl glass-strong p-4">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label={t("deliveryFee")} value={formatPrice(deliveryFee)} />
            {discount > 0 && <Row label="Promo" value={`−${formatPrice(discount)}`} positive />}
            <div className="mt-3 border-t border-white/10 pt-3">
              <Row label={t("total")} value={formatPrice(total)} big />
            </div>
          </div>

          <button
            onClick={() => navigate({ to: "/checkout" })}
            className="mt-6 w-full rounded-full bg-white py-4 font-semibold text-[#141E30] shadow-glow"
          >
            {t("checkout")} · {formatPrice(total)}
          </button>
        </>
      )}
    </Screen>
  );
}

function Row({ label, value, big, positive }: { label: string; value: string; big?: boolean; positive?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm ${big ? "font-semibold text-white" : "text-white/60"}`}>{label}</span>
      <span className={`${big ? "font-display text-lg font-bold" : "text-sm font-semibold"} ${positive ? "text-emerald-300" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
