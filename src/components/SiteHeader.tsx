import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCartStore, useCartHydration } from "@/lib/cartStore";
import { CartDrawer } from "./CartDrawer";
import { AnnouncementBar } from "./AnnouncementBar";
import { BrandLogo } from "./BrandLogo";

const NAV = [
  { label: "Peptides", to: "/collection" },
  { label: "Research", to: "/research" },
  { label: "Quality", to: "/quality" },
  { label: "Lab Reports", to: "/lab-reports" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  useCartHydration();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const addedNotice = useCartStore((state) => state.addedNotice);
  const dismissAddedNotice = useCartStore((state) => state.dismissAddedNotice);


  useEffect(() => {
    if (addedNotice) setCartOpen(true);
  }, [addedNotice]);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-white">
        <AnnouncementBar />

        {/* Utility row */}
        <div className="border-b border-hairline bg-white px-6 md:px-10">
          <div className="mx-auto flex max-w-7xl items-center gap-6 py-3.5">
            <Link to="/" aria-label="Regent Peptides home" className="shrink-0">
              <BrandLogo />
            </Link>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = search.trim();
                navigate({
                  to: "/collection",
                  search: q ? { q } : {},
                });
              }}

              className="hidden flex-1 items-center rounded-sm border border-hairline bg-white focus-within:border-navy md:flex"
              role="search"
            >
              <input
                type="search"
                name="q"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search peptides and research compounds..."
                aria-label="Search peptides"
                className="w-full bg-transparent px-4 py-3 text-sm text-ink outline-none placeholder:text-steel/70"
              />
              <button
                type="submit"
                aria-label="Search"
                className="border-l border-hairline px-4 py-3 text-steel transition-colors hover:text-navy"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </button>
            </form>


            <div className="ml-auto flex shrink-0 items-center gap-6 md:ml-0">
              <button

                onClick={() => setCartOpen(true)}
                className="relative flex flex-col items-center text-steel transition-colors hover:text-navy"
                aria-label={`Open basket (${totalItems} items)`}
              >
                <ShoppingCart className="h-[19px] w-[19px]" strokeWidth={1.5} />
                <span className="mt-1 text-[10px]">Cart</span>
                <span className="absolute -top-1.5 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-labblue px-1 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="text-navy lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation row */}
        <div className="hidden border-b border-hairline bg-white px-6 md:px-10 lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
            <nav className="flex items-center gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/80 transition-colors hover:text-labblue"
                  activeProps={{ className: "text-labblue" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/contact"
              className="border border-labblue px-5 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-labblue transition-colors hover:bg-labblue hover:text-white"
            >
              Bulk Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-0 z-[60] bg-white transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
          <BrandLogo compact />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-navy"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" strokeWidth={1.6} />
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-4">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="border-b border-hairline py-5 font-display text-lg font-bold uppercase tracking-[0.06em] text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="px-6 pt-8 text-[10px] uppercase tracking-[0.18em] text-steel">
          For research use only. Not for human consumption.
        </p>
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
          dismissAddedNotice();
        }}
      />
    </>
  );
}
