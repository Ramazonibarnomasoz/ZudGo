import type { ReactNode } from "react";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden gradient-brand">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#35577D]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#1a2a44]/40 blur-3xl" />

      <div className="relative h-full w-full max-w-[440px] sm:h-[900px] sm:max-h-[95vh] sm:rounded-[44px] sm:border sm:border-white/10 sm:shadow-glow overflow-hidden bg-[#0f1828]">
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
