import { useMemo, useState } from "react";

interface Props {
  /** Vial content in mg, parsed from the selected variant (e.g. "5mg"). */
  defaultMg?: number | null;
}

const DILUENT_PRESETS = [1, 2, 3, 5];

function fmt(n: number, dp = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}

/**
 * Laboratory reconstitution reference: converts vial content and diluent
 * volume into resulting concentration. Educational reference for research
 * preparation only; it does not provide administration guidance.
 */
export function ReconstitutionCalculator({ defaultMg }: Props) {
  const [mg, setMg] = useState<string>(defaultMg ? String(defaultMg) : "5");
  const [ml, setMl] = useState<string>("2");

  const result = useMemo(() => {
    const m = parseFloat(mg);
    const v = parseFloat(ml);
    if (!(m > 0) || !(v > 0)) return null;
    const mgPerMl = m / v;
    return {
      mgPerMl,
      mcgPerMl: mgPerMl * 1000,
      mcgPerTenthMl: mgPerMl * 100, // 0.1 ml = 10 units on a U-100 syringe
    };
  }, [mg, ml]);

  const field =
    "w-full border-b border-hairline bg-transparent py-2 text-[20px] text-navy outline-none tabular-nums focus:border-navy";

  return (
    <div className="border border-hairline bg-labwhite p-6 md:p-8">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
        <h3 className="text-[18px] font-medium tracking-[-0.01em] text-navy">
          Reconstitution reference
        </h3>
        <p className="text-[13px] text-steel">Concentration after adding diluent</p>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1fr_1.2fr]">
        <label className="block">
          <span className="text-[13px] text-steel">Vial content (mg)</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            value={mg}
            onChange={(e) => setMg(e.target.value)}
            className={field}
          />
        </label>

        <label className="block">
          <span className="text-[13px] text-steel">Diluent added (ml)</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            value={ml}
            onChange={(e) => setMl(e.target.value)}
            className={field}
          />
          <span className="mt-2 flex gap-2">
            {DILUENT_PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setMl(String(v))}
                className={`border px-2.5 py-1 text-[12px] transition-colors ${
                  ml === String(v)
                    ? "border-navy bg-navy text-white"
                    : "border-hairline bg-white text-steel hover:border-navy hover:text-navy"
                }`}
              >
                {v} ml
              </button>
            ))}
          </span>
        </label>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-l border-hairline pl-8 md:grid-cols-1">
          <div>
            <dt className="text-[13px] text-steel">Concentration</dt>
            <dd className="mt-0.5 text-[22px] font-medium tabular-nums text-navy">
              {result ? fmt(result.mgPerMl) : "—"}{" "}
              <span className="text-[13px] font-normal text-steel">mg / ml</span>
            </dd>
          </div>
          <div>
            <dt className="text-[13px] text-steel">Per 0.1 ml (10 units, U-100)</dt>
            <dd className="mt-0.5 text-[22px] font-medium tabular-nums text-navy">
              {result ? fmt(result.mcgPerTenthMl, 0) : "—"}{" "}
              <span className="text-[13px] font-normal text-steel">mcg</span>
            </dd>
          </div>
        </dl>
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed text-steel">
        Reference for laboratory preparation of lyophilised material only. Add diluent slowly down
        the inside of the vial and swirl gently; do not shake. Not administration guidance; for
        research use only.
      </p>
    </div>
  );
}
