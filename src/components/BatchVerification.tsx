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
            record.compound.toLowerCase().includes(q) || record.batch.toLowerCase().includes(q),
        )
      : LAB_REPORTS;
    return limit ? list.slice(0, limit) : list;
  }, [submitted, limit]);

  return (
    <div className="border-y border-hairline bg-white">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(query);
        }}
        className="flex flex-col gap-3 border-b border-hairline py-5 sm:flex-row sm:items-center"
      >
        <label htmlFor="batch-search" className="sr-only">
          Enter product or batch number
        </label>
        <div className="flex flex-1 items-center gap-3 border-b border-hairline py-2.5 focus-within:border-navy">
          <Search className="h-4 w-4 shrink-0 text-platinum" strokeWidth={1.5} />
          <input
            id="batch-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter a product or batch number"
            className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-steel/70"
          />
        </div>
        <button
          type="submit"
          className="bg-navy px-6 py-3 text-[13px] font-medium text-white transition-colors hover:bg-labblue"
        >
          Search reports
        </button>
      </form>

      <div className="hidden grid-cols-[1.4fr_1.2fr_0.8fr_0.9fr_0.8fr] gap-4 border-b border-hairline py-3 text-[11px] uppercase tracking-[0.12em] text-steel lg:grid">
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
            className="grid gap-2 py-4 lg:grid-cols-[1.4fr_1.2fr_0.8fr_0.9fr_0.8fr] lg:items-center lg:gap-4"
          >
            <div>
              <p className="text-[15px] font-medium text-navy">
                {record.compound} {record.strength}
              </p>
              <p className="mt-0.5 text-[12px] text-steel lg:hidden">Batch {record.batch}</p>
            </div>
            <p className="hidden font-mono text-[12px] tracking-[0.04em] text-steel lg:block">
              {record.batch}
            </p>
            <p className="hidden text-[13px] text-steel lg:block">{record.method}</p>
            <p>
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] ${
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
                className="text-[13px] text-labblue underline-offset-4 hover:underline"
              >
                View report
              </a>
            </p>
          </li>
        ))}
        {records.length === 0 && (
          <li className="py-12 text-center text-sm text-steel">
            No records match that product or batch reference.
          </li>
        )}
      </ul>
    </div>
  );
}
