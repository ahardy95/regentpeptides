import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { LAB_REPORTS } from "@/lib/labReports";

interface BatchVerificationProps {
  /** Limit the number of records shown (homepage preview). */
  limit?: number;
}

export function BatchVerification({ limit }: BatchVerificationProps) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const records = useMemo(() => {
    const q = submitted.trim().toLowerCase();
    const list = q
      ? LAB_REPORTS.filter(
          (record) =>
            record.compound.toLowerCase().includes(q) ||
            record.batch.toLowerCase().includes(q)
        )
      : LAB_REPORTS;
    return limit ? list.slice(0, limit) : list;
  }, [submitted, limit]);

  return (
    <div className="rounded-xl border border-hairline bg-white">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(query);
        }}
        className="flex flex-col gap-3 border-b border-hairline p-5 sm:flex-row sm:items-center md:p-6"
      >
        <label htmlFor="batch-search" className="sr-only">
          Enter product or batch number
        </label>
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-hairline bg-labwhite px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-platinum" strokeWidth={1.5} />
          <input
            id="batch-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ENTER PRODUCT OR BATCH NUMBER"
            className="w-full bg-transparent font-sans text-[11px] uppercase tracking-[0.16em] text-ink outline-none placeholder:text-platinum"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-navy px-6 py-3 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-labblue"
        >
          Search Reports
        </button>
      </form>

      <div className="hidden grid-cols-[1.4fr_1.2fr_0.8fr_0.9fr_0.8fr] gap-4 border-b border-hairline bg-clinical px-6 py-3 text-[9px] uppercase tracking-[0.2em] text-steel lg:grid">
        <span>Compound</span>
        <span>Batch</span>
        <span>Method</span>
        <span>Status</span>
        <span className="text-right">COA</span>
      </div>

      <ul className="divide-y divide-hairline">
        {records.map((record) => (
          <li
            key={record.batch}
            className="grid gap-2 px-5 py-4 md:px-6 lg:grid-cols-[1.4fr_1.2fr_0.8fr_0.9fr_0.8fr] lg:items-center lg:gap-4"
          >
            <div>
              <p className="font-display text-sm font-semibold text-navy">
                {record.compound} {record.strength}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-steel lg:hidden">
                Batch {record.batch}
              </p>
            </div>
            <p className="hidden font-mono text-[11px] tracking-[0.08em] text-steel lg:block">
              {record.batch}
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.16em] text-steel lg:block">
              {record.method}
            </p>
            <p>
              <span
                className={`inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] ${
                  record.status === "VERIFIED" ? "text-verified" : "text-steel"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    record.status === "VERIFIED" ? "bg-verified" : "bg-platinum"
                  }`}
                  aria-hidden
                />
                {record.status}
              </span>
            </p>
            <p className="lg:text-right">
              <a
                href={record.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-labblue underline-offset-4 hover:underline"
              >
                View Report
              </a>
            </p>
          </li>
        ))}
        {records.length === 0 && (
          <li className="px-6 py-12 text-center text-sm text-steel">
            No records match that product or batch reference.
          </li>
        )}
      </ul>
    </div>
  );
}
