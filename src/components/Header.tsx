import { FormEvent, useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navItems, siteConfig } from "../data/site";
import { useStore } from "../context/StoreContext";

function navClass({ isActive }: { isActive: boolean }) {
  return `text-sm font-medium transition hover:text-olive ${
    isActive ? "text-olive" : "text-ink/75"
  }`;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount, favoritesCount } = useStore();

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/catalogo?busca=${encodeURIComponent(trimmed)}` : "/catalogo");
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-mist/95 backdrop-blur">
      <div className="container-page">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <button
            className="icon-button lg:hidden"
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>

          <Link to="/" className="group shrink-0" aria-label="Urban Select - Início">
            <span className="block text-lg font-black uppercase tracking-[0.18em] text-ink sm:text-xl">
              {siteConfig.logo.primary}
            </span>
            <span className="-mt-1 block text-xs font-semibold uppercase tracking-[0.42em] text-brass transition group-hover:text-olive">
              {siteConfig.logo.secondary}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Menu principal">
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden w-56 items-center xl:flex">
              <label className="sr-only" htmlFor="desktop-search">
                Buscar produtos
              </label>
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" size={17} />
                <input
                  id="desktop-search"
                  className="focus-ring w-full rounded-sm border border-ink/10 bg-white py-2.5 pl-10 pr-3 text-sm"
                  placeholder="Buscar produto"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </form>

            <Link className="icon-button hidden sm:inline-flex" to="/contato" aria-label="Minha conta">
              <UserRound size={19} aria-hidden="true" />
            </Link>
            <Link className="icon-button relative" to="/catalogo?favoritos=true" aria-label="Favoritos">
              <Heart size={19} aria-hidden="true" />
              {favoritesCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-olive px-1 text-[11px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link className="icon-button relative" to="/carrinho" aria-label="Carrinho">
              <ShoppingBag size={19} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brass px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-ink/45 lg:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto flex h-full w-[min(88vw,390px)] flex-col bg-mist shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
              <div>
                <p className="text-base font-black uppercase tracking-[0.18em]">{siteConfig.name}</p>
                <p className="text-xs font-medium text-ink/55">{siteConfig.tagline}</p>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMobileOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="border-b border-ink/10 p-5">
              <label className="sr-only" htmlFor="mobile-search">
                Buscar produtos
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" size={18} />
                <input
                  id="mobile-search"
                  className="field pl-10"
                  placeholder="Buscar camiseta, tênis, bolsa..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </form>

            <nav className="grid gap-1 px-5 py-5" aria-label="Menu mobile">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="rounded-sm px-2 py-3 text-base font-semibold text-ink transition hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/sobre"
                className="rounded-sm px-2 py-3 text-base font-semibold text-ink transition hover:bg-white"
                onClick={() => setMobileOpen(false)}
              >
                Sobre a loja
              </NavLink>
              <NavLink
                to="/contato"
                className="rounded-sm px-2 py-3 text-base font-semibold text-ink transition hover:bg-white"
                onClick={() => setMobileOpen(false)}
              >
                Contato
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
