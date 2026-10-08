import { useCallback, useEffect, useRef, useState } from "react";
import { X, Check, Copy } from "lucide-react";

const DISMISS_KEY = "regent-newsletter-dismissed-at";
const SUBSCRIBED_KEY = "regent-newsletter-subscribed";
export const WELCOME_CODES_KEY = "regent-welcome-codes";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const DELAY_MS = 15_000;

const DIAL_CODES = [
  { code: "+44", label: "UK +44" },
  { code: "+353", label: "IE +353" },
  { code: "+1", label: "US/CA +1" },
  { code: "+61", label: "AU +61" },
  { code: "+49", label: "DE +49" },
  { code: "+33", label: "FR +33" },
  { code: "+34", label: "ES +34" },
  { code: "+39", label: "IT +39" },
  { code: "+31", label: "NL +31" },
  { code: "+46", label: "SE +46" },
];

function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("+44");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(SUBSCRIBED_KEY)) return;
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < SEVEN_DAYS) return;

    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && !viewedRef.current) {
      viewedRef.current = true;
      track("newsletter_popup_view");
    }
  }, [open]);

  const dismiss = useCallback(() => {
    if (status !== "done") {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
      track("newsletter_popup_dismiss");
    }
    setOpen(false);
  }, [status]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, dismiss]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/public/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, dialCode, website: honeypot }),
      });
      const data = (await res.json()) as {
        success: boolean;
        code?: string;
        codeLow?: string | null;
        error?: string;
      };
      if (!res.ok || !data.success || !data.code) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      localStorage.setItem(SUBSCRIBED_KEY, "1");
      localStorage.setItem(
        WELCOME_CODES_KEY,
        JSON.stringify({ high: data.code, low: data.codeLow ?? null }),
      );
      setCode(data.code);
      setStatus("done");
      track("newsletter_signup", { method: "popup" });
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 px-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      <div className="relative w-full max-w-md bg-white p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] md:p-10">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 p-1.5 text-steel transition-colors hover:text-navy"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "done" && code ? (
          <div className="text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-labblue text-white">
              <Check className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-[24px] font-medium tracking-[-0.02em] text-navy">
              You’re on the research list
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              Here is your one time use store credit code. Enter or apply it at checkout.
            </p>
            <div className="mt-6 flex items-center justify-between gap-3 border border-hairline bg-labwhite px-4 py-3.5">
              <span className="font-mono text-base font-semibold tracking-[0.12em] text-labblue">
                {code}
              </span>
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 bg-navy px-3 py-2 text-[12px] font-medium text-white transition-colors hover:bg-labblue"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 text-[13px] text-steel underline-offset-4 hover:text-navy hover:underline"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow text-labblue">Welcome offer</p>
            <h2 className="headline mt-4 text-[28px] text-navy">
              Up to £10 store credit on your first order
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-steel">
              Join the research list for new compounds, batch releases and priority stock access.
              Your one-time credit code arrives instantly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                maxLength={255}
                className="w-full border border-hairline bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-steel/70 focus:border-navy"
              />

              <div className="flex gap-2">
                <select
                  value={dialCode}
                  onChange={(e) => setDialCode(e.target.value)}
                  aria-label="Country code"
                  className="border border-hairline bg-white px-3 py-3 text-[15px] text-ink outline-none focus:border-navy"
                >
                  {DIAL_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (optional)"
                  maxLength={20}
                  className="w-full border border-hairline bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-steel/70 focus:border-navy"
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-labblue px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-navy disabled:opacity-60"
              >
                {status === "loading" ? "One moment…" : "Claim my store credit"}
              </button>
            </form>

            <p className="mt-5 text-[12px] leading-relaxed text-steel">
              For laboratory research use only. £5 off orders over £30, £10 off orders over £80.
              Applied automatically at checkout, minimum spend applies. By submitting, you agree to
              receive email updates — and SMS offers if you enter a phone number.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
