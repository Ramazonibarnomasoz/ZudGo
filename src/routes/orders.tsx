import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import { useApp } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { Receipt, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/orders")({ component: Orders });

function Orders() {
  const { t } = useI18n();
  const orders = useApp((s) => s.orders);

  const statusLabel = (s: string) =>
    s === "preparing" ? "Preparing" : s === "on_the_way" ? "On the way" : "Delivered";
  const statusColor = (s: string) =>
    s === "preparing" ? "bg-amber-400/20 text-amber-200" : s === "on_the_way" ? "bg-blue-400/20 text-blue-200" : "bg-emerald-400/20 text-emerald-200";

  return (
    <>
      <Screen title={t("orders")} withNav>
        {orders.length === 0 ? (
          <div className="mt-24 flex flex-col items-center text-center text-white/60">
            <div className="flex h-20 w-20 items-center justify-center rounded-full glass">
              <Receipt className="h-8 w-8" />
            </div>
            <p className="mt-4 font-display text-lg text-white">No orders yet</p>
            <p className="mt-1 text-sm">Your past orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <Link
                key={o.id}
                to="/tracking/$id"
                params={{ id: o.id }}
                className="flex items-center justify-between rounded-2xl glass p-4"
              >
                <div>
                  <div className="font-display text-sm font-semibold text-white">{o.restaurantName}</div>
                  <div className="mt-0.5 text-xs text-white/50">{o.id} · {o.items.length} items</div>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor(o.status)}`}>
                    {statusLabel(o.status)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-display text-base font-bold text-white">{formatPrice(o.total)}</div>
                  <ChevronRight className="ml-auto mt-1 h-4 w-4 text-white/40" />
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
