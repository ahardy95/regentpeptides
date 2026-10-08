import { Truck } from "lucide-react";

/** Thin shipping notice sitting above the primary navigation. */
export function AnnouncementBar() {
  return (
    <div className="border-b border-hairline bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2 md:px-10">
        <Truck className="h-3.5 w-3.5 text-labblue" strokeWidth={1.6} aria-hidden />
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-navy">
          UK delivery — Royal Mail Tracked 24 from £4.99
        </p>

      </div>
    </div>
  );
}
