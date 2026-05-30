import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function Screen({
  children,
  title,
  back,
  right,
  padded = true,
  withNav = false,
}: {
  children: ReactNode;
  title?: string;
  back?: string | true;
  right?: ReactNode;
  padded?: boolean;
  withNav?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {title !== undefined && (
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-12 pb-3">
          <div className="flex items-center gap-2">
            {back && (
              <Link
                to={typeof back === "string" ? back : "/home"}
                className="flex h-10 w-10 items-center justify-center rounded-full glass"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Link>
            )}
            <h1 className="font-display text-lg font-semibold text-white">{title}</h1>
          </div>
          {right}
        </header>
      )}
      <div
        className={`no-scrollbar h-full overflow-y-auto ${
          title !== undefined ? "pt-24" : "pt-12"
        } ${withNav ? "pb-32" : "pb-8"} ${padded ? "px-4" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
