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
  { label: "Lab reports", to: "/lab-reports" },
  { label: "About", to: "/about" },
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
    state.items.reduce((sum, item) => sum + item.quantity, 0),
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
          <div className="mx-auto flex max-w-7xl items-center gap-8 py-4">
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

              className="ml-auto hidden w-full max-w-xs items-center border-b border-hairline bg-white transition-colors focus-within:border-navy md:flex"
              role="search"
            >
              <input
                type="search"
                name="q"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search compounds"
                aria-label="Search peptides"
                className="w-full bg-transparent py-2 text-[13px] text-ink outline-none placeholder:text-steel/70"
              />
              <button
                type="submit"
                aria-label="Search"
                className="pl-3 text-steel transition-colors hover:text-navy"
              >
                <Search className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </form>

            <div className="ml-auto flex shrink-0 items-center gap-6 md:ml-2">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 text-navy transition-colors hover:text-labblue"
                aria-label={`Open basket (${totalItems} items)`}
              >
                <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                <span className="hidden text-[13px] font-medium sm:inline">Basket</span>
                {totalItems > 0 && (
                  <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-labblue px-1 text-[10px] font-semibold text-white">
                    {totalItems}
                  </span>
                )}
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
          <div className="mx-auto flex max-w-7xl items-center justify-between py-2.5">
            <nav className="flex items-center gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-[13.5px] font-medium tracking-[0.01em] text-navy/85 transition-colors hover:text-labblue"
                  activeProps={{ className: "text-labblue" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/contact"
              className="border border-navy/30 px-4 py-2 text-[12.5px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Bulk enquiry
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
          <button onClick={() => setMenuOpen(false)} className="text-navy" aria-label="Close menu">
            <X className="h-6 w-6" strokeWidth={1.6} />
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-4">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="border-b border-hairline py-5 text-[24px] font-medium leading-none text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="px-6 pt-8 text-[12px] text-steel">
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
