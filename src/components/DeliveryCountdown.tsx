import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

const LONDON = "Europe/London";

function londonParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value])
  ) as Record<string, string>;
  return {
    hour: Number(parts["hour"] === "24" ? "0" : parts["hour"]),
    minute: Number(parts["minute"]),
    second: Number(parts["second"]),
    weekday: parts["weekday"] ?? "",
  };
}

/** Milliseconds until the next 15:00 London cut-off. */
function msUntilCutoff(now: Date) {
  const { hour, minute, second } = londonParts(now);
  const secondsNow = hour * 3600 + minute * 60 + second;
  const cutoff = 15 * 3600;
  const remaining = cutoff - secondsNow;

  return remaining > 0 ? remaining * 1000 : null;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function DigitBox({ digit, label }: { digit: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden rounded-sm border border-hairline bg-white px-3 py-3 shadow-[inset_0_0_24px_rgba(0,35,102,0.06)] sm:px-4 sm:py-4">
        <span className="block min-w-[1.1em] text-center font-display text-3xl text-ink tabular-nums sm:text-4xl">
          {digit}
        </span>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-clinical" />
      </div>
      <span className="text-[9px] uppercase tracking-[0.25em] text-steel">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <div className="flex flex-col justify-center gap-2 pb-6 text-labblue/60">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
    </div>
  );
}

export function DeliveryCountdown({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = now ? msUntilCutoff(now) : null;
  const weekday = now ? londonParts(now).weekday : "";
  const isWeekend = weekday === "Sat" || weekday === "Sun";
  const open = remaining !== null && !isWeekend;

  const totalSeconds = Math.max(0, Math.floor((remaining ?? 0) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div
      className={`flex flex-col items-center gap-6 border border-hairline bg-white px-6 py-6 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-left ${className ?? ""}`}
    >
      <Truck
        className="h-5 w-5 shrink-0 text-labblue"
        strokeWidth={1}
        aria-hidden="true"
      />

      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-labblue">
          Order before 3:00pm
        </p>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          For same-day UK dispatch on Royal Mail Tracked 24 (from £4.99).
        </p>

      </div>

      {now === null ? (
        <div className="h-20 w-52" aria-hidden />
      ) : open ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <DigitBox digit={pad(hours)} label="Hrs" />
          <Colon />
          <DigitBox digit={pad(minutes)} label="Min" />
          <Colon />
          <DigitBox digit={pad(seconds)} label="Sec" />
        </div>
      ) : (
        <p className="font-display text-lg text-ink">
          {isWeekend
            ? "Orders dispatch the next working day"
            : "Today's cut-off has passed — ships tomorrow"}
        </p>
      )}
    </div>
  );
}
