const POINTS = [
  "Independently tested by Janoshik Analytical",
  "Certificate of Analysis with every batch",
  "Tracked UK delivery from £4.99",
  "Same-day dispatch before 3pm",
];

/** Quiet single-line assurance strip directly beneath the navigation. */
export function TrustBar() {
  return (
    <section className="border-b border-hairline bg-labwhite">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-1.5 px-6 py-2.5 md:px-10">
        {POINTS.map((point, i) => (
          <li
            key={point}
            className={`items-center gap-2.5 text-[12.5px] text-steel ${
              i < 2 ? "flex" : "hidden sm:flex"
            }`}
          >
            <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-labblue" aria-hidden />
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
