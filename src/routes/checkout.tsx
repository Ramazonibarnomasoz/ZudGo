import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { formatPrice, paymentMethods } from "@/lib/data";
import { useState } from "react";
import { MapPin, Phone, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({ component: Checkout });

function Checkout() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { cart, address, setAddress, placeOrder, clearCart, phone, advanceOrder } = useApp();
  const [contact, setContact] = useState(phone ?? "+992 ");
  const [pay, setPay] = useState("card");

  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  const place = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    const restaurantName = cart[0]?.restaurantName ?? "ZudGo";
    const id = placeOrder({
      items: cart,
      total,
      address,
      payment: paymentMethods.find((p) => p.id === pay)?.name ?? pay,
      restaurantName,
    });
    clearCart();
    toast.success("Order placed!");
    // simulate progression
    setTimeout(() => advanceOrder(id), 6000);
    setTimeout(() => advanceOrder(id), 14000);
    navigate({ to: "/tracking/$id", params: { id } });
  };

  return (
    <Screen title={t("checkout")} back="/cart">
      <Block icon={<MapPin className="h-4 w-4" />} title={t("address")}>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none"
        />
      </Block>

      <Block icon={<Phone className="h-4 w-4" />} title="Contact number">
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none"
        />
      </Block>

      <div className="mt-5">
        <div className="mb-2 text-xs uppercase tracking-widest text-white/40">{t("payment")}</div>
        <div className="space-y-2">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setPay(m.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 transition ${
                pay === m.id ? "bg-white text-[#141E30]" : "glass text-white"
              }`}
            >
              <span className="text-xl">{m.icon}</span>
              <span className="flex-1 text-left text-sm font-semibold">{m.name}</span>
              {pay === m.id && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl glass-strong p-4">
        <Row label="Subtotal" value={formatPrice(subtotal)} />
        <Row label={t("deliveryFee")} value={formatPrice(deliveryFee)} />
        <div className="mt-3 border-t border-white/10 pt-3">
          <Row label={t("total")} value={formatPrice(total)} big />
        </div>
      </div>

      <button
        onClick={place}
        className="mt-6 w-full rounded-full bg-white py-4 font-semibold text-[#141E30] shadow-glow"
      >
        {t("placeOrder")} · {formatPrice(total)}
      </button>
    </Screen>
  );
}

function Block({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl glass p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
        {icon} {title}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm ${big ? "font-semibold text-white" : "text-white/60"}`}>{label}</span>
      <span className={`${big ? "font-display text-lg font-bold text-white" : "text-sm font-semibold text-white"}`}>{value}</span>
    </div>
  );
}
