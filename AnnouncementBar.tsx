import { Truck } from "lucide-react";

/** Thin shipping notice sitting above the primary navigation. */
export function AnnouncementBar() {
  return (
    <div className="border-b border-hairline bg-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-1.5 md:px-10">
        <Truck className="h-3.5 w-3.5 text-white/70" strokeWidth={1.6} aria-hidden />
        <p className="text-[12px] text-white/85">UK delivery — Royal Mail Tracked 24 from £4.99</p>
      </div>
    </div>
  );
}
