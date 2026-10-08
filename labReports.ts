/** Deterministic batch identifier derived from a compound title. */
export function batchNumberFor(title: string, dosage?: string | null) {
  const token = title
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase()
    .slice(0, 3)
    .padEnd(3, "X");
  let hash = 0;
  const seed = `${title}${dosage ?? ""}`;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 9000;
  }
  return `RP-${token}-26${String(hash % 900 + 100).padStart(3, "0")}`;
}

export interface LabReportRecord {
  compound: string;
  strength: string;
  batch: string;
  method: string;
  released: string;
  status: "VERIFIED" | "IN ANALYSIS";
  /** Independent third-party verification link (Janoshik Analytical). */
  url: string;
}

export const LAB_REPORTS: LabReportRecord[] = [
  { compound: "BPC-157", strength: "10mg", batch: "45213-7ZRQ5NXSWEHU", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/45213_7ZRQ5NXSWEHU" },
  { compound: "SS-31", strength: "50mg", batch: "70112-KFCMHEXZ1BEV", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/70112_KFCMHEXZ1BEV" },
  { compound: "GHK-Cu", strength: "50mg", batch: "70116-ZDW7UV6LUXQM", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/70116_ZDW7UV6LUXQM" },
  { compound: "Tesamorelin", strength: "10mg", batch: "90725-RTFTEPXURPDH", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/90725_RTFTEPXURPDH" },
  { compound: "Tirzepatide", strength: "40mg", batch: "100378-5P8TRAFCXWMW", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/100378_5P8TRAFCXWMW" },
  { compound: "Retatrutide", strength: "20mg", batch: "107140-CF85XHDRQDLS", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/107140_CF85XHDRQDLS" },
  { compound: "Retatrutide", strength: "10mg", batch: "111297-WU1CVFBBCHVX", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/111297_WU1CVFBBCHVX" },
  { compound: "GHK-Cu", strength: "100mg", batch: "173608-GQ8EJAUKJG7C", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/173608_GQ8EJAUKJG7C" },
  { compound: "Semax", strength: "", batch: "173615-DFXXNULUKYZI", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/173615_DFXXNULUKYZI" },
  { compound: "Melanotan", strength: "", batch: "173613-6CSIHAPQJ5Z7", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/173613_6CSIHAPQJ5Z7" },
  { compound: "GLOW", strength: "", batch: "173610-9UJ5B62SS4L4", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/173610_9UJ5B62SS4L4" },
  { compound: "Retatrutide", strength: "30mg", batch: "173604-951TQMMBPYTQ", method: "HPLC / MS", released: "", status: "VERIFIED", url: "https://verify.janoshik.com/tests/173604_951TQMMBPYTQ" },
];


