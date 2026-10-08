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
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value])) as Record<
    string,
    string
  >;
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

function Digit({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex items-baseline gap-1">
      <span className="text-[22px] font-medium leading-none text-navy tabular-nums">{value}</span>
      <span className="text-[11px] uppercase tracking-[0.08em] text-steel">{label}</span>
    </span>
  );
}

export function DeliveryCountdown({
  className,
  stack,
}: {
  className?: string;
  /** Always stack copy above the timer (narrow columns). */
  stack?: boolean;
}) {
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
      className={`flex flex-col gap-3 py-5 ${
        stack ? "" : "sm:flex-row sm:items-center sm:justify-between sm:gap-8"
      } ${className ?? ""}`}
    >
      <div className="flex items-start gap-3">
        <Truck
          className="mt-0.5 h-[18px] w-[18px] shrink-0 text-labblue"
          strokeWidth={1.4}
          aria-hidden="true"
        />
        <p className="text-[14px] leading-snug text-ink">
          <span className="font-medium">Order before 3pm</span>
          <span className="text-steel">
            {" "}
            for same-day UK dispatch on Royal Mail Tracked 24, from £4.99.
          </span>
        </p>
      </div>

      {now === null ? (
        <div className="h-7 w-44" aria-hidden />
      ) : open ? (
        <div className={`flex shrink-0 items-center gap-4 pl-[30px] ${stack ? "" : "sm:pl-0"}`}>
          <Digit value={pad(hours)} label="hrs" />
          <Digit value={pad(minutes)} label="min" />
          <Digit value={pad(seconds)} label="sec" />
          <span className="hidden text-[12px] text-steel md:inline">until cut-off</span>
        </div>
      ) : (
        <p className={`shrink-0 pl-[30px] text-[14px] text-steel ${stack ? "" : "sm:pl-0"}`}>
          {isWeekend
            ? "Orders dispatch the next working day"
            : "Today’s cut-off has passed — ships tomorrow"}
        </p>
      )}
    </div>
  );
}
