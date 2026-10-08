import vialBase from "@/assets/vial-base.jpg";


interface VialImageProps {
  title: string;
  dosage?: string | null;
  className?: string;
  eager?: boolean;
}

/** Cleans a product title down to the compound name printed on the label. */
export function vialLabelName(title: string) {
  return title
    .replace(/\(.*?\)/g, "")
    .replace(/\s*[—–-]\s*research peptide.*$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function nameFontSize(name: string) {
  const longest = name.split(/[\s-]/).reduce((a, w) => Math.max(a, w.length), 0);
  if (longest <= 6) return 5.2;
  if (longest <= 9) return 4.4;
  if (longest <= 12) return 3.6;
  if (longest <= 16) return 2.9;
  return 2.3;
}


/**
 * Renders the Regent Peptides vial with the compound name, strength and
 * batch reference composited onto the blank label panel.
 */
export function VialImage({ title, dosage, className, eager }: VialImageProps) {
  const name = vialLabelName(title);
  const dose = (dosage ?? "").trim();
  const doseText =
    dose && dose.toLowerCase() !== "default title"
      ? dose.replace(/([0-9.]+)\s*(mg|mcg|iu|ml)/i, "$1 $2").toUpperCase()
      : null;
  

  return (
    <div
      className={`relative h-full w-full ${className ?? ""}`}
      style={{ containerType: "size" }}
    >
      <img
        src={vialBase}
        alt={`${name} research vial by Regent Peptides`}
        className="h-full w-full object-cover"
        loading={eager ? "eager" : "lazy"}
        width={1024}
        height={1024}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 flex flex-col items-center text-center"
          style={{
            top: "44cqh",
            transform: "translateX(-50%)",
            width: "28cqh",
            maxWidth: "29cqw",
          }}
        >
          <span
            className="font-display font-semibold"
            style={{
              fontSize: `${nameFontSize(name)}cqh`,
              lineHeight: 1.06,
              letterSpacing: "0.01em",
              color: "#161917",
              overflowWrap: "anywhere",
            }}
          >
            {name}
          </span>
          {doseText && (
            <span
              className="font-sans"
              style={{
                marginTop: "1.4cqh",
                fontSize: "3.3cqh",
                letterSpacing: "0.18em",
                color: "#0c6b3d",
              }}
            >
              {doseText}
            </span>
          )}
          <span
            className="font-sans"
            style={{
              marginTop: "1.8cqh",
              fontSize: "1.9cqh",
              lineHeight: 1.4,
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
              color: "#63717a",
            }}
          >
            RESEARCH USE ONLY
          </span>
        </div>
      </div>

    </div>
  );
}
