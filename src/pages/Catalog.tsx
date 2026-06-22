import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { categories, productBrands, productColors, productSizes, products } from "../data/products";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatCurrency, normalizeText } from "../utils/format";

type Filters = {
  search: string;
  category: string;
  brand: string;
  size: string;
  color: string;
  gender: string;
  offers: boolean;
  favoritesOnly: boolean;
  maxPrice: number;
  sort: string;
};

const maxProductPrice = Math.ceil(Math.max(...products.map((product) => product.price)) / 10) * 10;

function readFilters(params: URLSearchParams): Filters {
  return {
    search: params.get("busca") ?? "",
    category: params.get("categoria") ?? "",
    brand: params.get("marca") ?? "",
    size: params.get("tamanho") ?? "",
    color: params.get("cor") ?? "",
    gender: params.get("genero") ?? "",
    offers: params.get("ofertas") === "true",
    favoritesOnly: params.get("favoritos") === "true",
    maxPrice: Number(params.get("preco") ?? maxProductPrice),
    sort: params.get("ordenar") ?? "relevancia",
  };
}

export default function Catalog() {
  usePageMeta(
    "Catálogo | Urban Select",
    "Catálogo da Urban Select com filtros por categoria, marca, tamanho, cor, preço, ofertas e favoritos.",
  );

  const [params] = useSearchParams();
  const paramsString = params.toString();
  const { favorites } = useStore();
  const [filters, setFilters] = useState<Filters>(() => readFilters(params));
  const [visibleCount, setVisibleCount] = useState(8);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters(readFilters(new URLSearchParams(paramsString)));
  }, [paramsString]);

  useEffect(() => {
    setVisibleCount(8);
  }, [
    filters.search,
    filters.category,
    filters.brand,
    filters.size,
    filters.color,
    filters.gender,
    filters.offers,
    filters.favoritesOnly,
    filters.maxPrice,
    filters.sort,
  ]);

  function updateFilter<Key extends keyof Filters>(key: Key, value: Filters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function clearFilters() {
    setFilters({
      search: "",
      category: "",
      brand: "",
      size: "",
      color: "",
      gender: "",
      offers: false,
      favoritesOnly: false,
      maxPrice: maxProductPrice,
      sort: "relevancia",
    });
  }

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(filters.search);

    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        normalizeText(
          [product.name, product.brand, product.category, product.gender, ...product.tags].join(" "),
        ).includes(normalizedSearch);
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesSize = !filters.size || product.sizes.includes(filters.size);
      const matchesColor = !filters.color || product.colors.some((color) => color.name === filters.color);
      const matchesGender =
        !filters.gender || product.gender === filters.gender || product.gender === "Unissex";
      const matchesOffer = !filters.offers || Boolean(product.originalPrice);
      const matchesFavorites = !filters.favoritesOnly || favorites.includes(product.id);
      const matchesPrice = product.price <= filters.maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesSize &&
        matchesColor &&
        matchesGender &&
        matchesOffer &&
        matchesFavorites &&
        matchesPrice
      );
    });

    return filtered.sort((a, b) => {
      if (filters.sort === "preco-menor") return a.price - b.price;
      if (filters.sort === "preco-maior") return b.price - a.price;
      if (filters.sort === "novidades") return b.createdAt.localeCompare(a.createdAt);
      if (filters.sort === "mais-vendidos") return b.popularity - a.popularity;
      return b.popularity - a.popularity;
    });
  }, [filters, favorites]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const filterPanel = (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="catalog-search">
          Busca
        </label>
        <input
          id="catalog-search"
          className="field"
          value={filters.search}
          placeholder="Camiseta, tênis, bolsa..."
          onChange={(event) => updateFilter("search", event.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="catalog-category">
          Categoria
        </label>
        <select
          id="catalog-category"
          className="field"
          value={filters.category}
          onChange={(event) => updateFilter("category", event.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="catalog-brand">
          Marca
        </label>
        <select
          id="catalog-brand"
          className="field"
          value={filters.brand}
          onChange={(event) => updateFilter("brand", event.target.value)}
        >
          <option value="">Todas</option>
          {productBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="catalog-size">
            Tamanho
          </label>
          <select
            id="catalog-size"
            className="field"
            value={filters.size}
            onChange={(event) => updateFilter("size", event.target.value)}
          >
            <option value="">Todos</option>
            {productSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="catalog-color">
            Cor
          </label>
          <select
            id="catalog-color"
            className="field"
            value={filters.color}
            onChange={(event) => updateFilter("color", event.target.value)}
          >
            <option value="">Todas</option>
            {productColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="catalog-gender">
          Linha
        </label>
        <select
          id="catalog-gender"
          className="field"
          value={filters.gender}
          onChange={(event) => updateFilter("gender", event.target.value)}
        >
          <option value="">Todas</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Unissex">Unissex</option>
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="catalog-price">
            Preço
          </label>
          <span className="text-sm font-semibold">{formatCurrency(filters.maxPrice)}</span>
        </div>
        <input
          id="catalog-price"
          type="range"
          min="80"
          max={maxProductPrice}
          step="10"
          value={filters.maxPrice}
          className="w-full accent-olive"
          onChange={(event) => updateFilter("maxPrice", Number(event.target.value))}
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink/76">
        <input
          type="checkbox"
          className="h-4 w-4 accent-olive"
          checked={filters.offers}
          onChange={(event) => updateFilter("offers", event.target.checked)}
        />
        Somente ofertas
      </label>

      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink/76">
        <input
          type="checkbox"
          className="h-4 w-4 accent-olive"
          checked={filters.favoritesOnly}
          onChange={(event) => updateFilter("favoritesOnly", event.target.checked)}
        />
        Meus favoritos
      </label>

      <button className="button-secondary w-full" type="button" onClick={clearFilters}>
        Limpar filtros
      </button>
    </div>
  );

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">Catálogo</p>
            <h1 className="text-4xl font-semibold md:text-5xl">Seleção Urban Select</h1>
            <p className="mt-3 text-sm leading-6 text-ink/62">
              {filteredProducts.length} produto{filteredProducts.length === 1 ? "" : "s"} encontrado
              {filteredProducts.length === 1 ? "" : "s"}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="button-secondary lg:hidden" type="button" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={17} aria-hidden="true" />
              Filtros
            </button>
            <label className="sr-only" htmlFor="catalog-sort">
              Ordenar produtos
            </label>
            <select
              id="catalog-sort"
              className="field min-w-48"
              value={filters.sort}
              onChange={(event) => updateFilter("sort", event.target.value)}
            >
              <option value="relevancia">Mais relevantes</option>
              <option value="novidades">Novidades</option>
              <option value="mais-vendidos">Mais vendidos</option>
              <option value="preco-menor">Menor preço</option>
              <option value="preco-maior">Maior preço</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden h-fit border border-ink/10 bg-white p-5 lg:block">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold">Filtros</h2>
              <SlidersHorizontal size={18} className="text-ink/45" aria-hidden="true" />
            </div>
            {filterPanel}
          </aside>

          <div>
            {filteredProducts.length > 0 ? (
              <>
                <ProductGrid products={visibleProducts} />
                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button className="button-secondary" type="button" onClick={() => setVisibleCount((count) => count + 4)}>
                      Carregar mais produtos
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="grid min-h-80 place-items-center border border-ink/10 bg-white p-8 text-center">
                <div>
                  <p className="eyebrow mb-3">Sem resultados</p>
                  <h2 className="text-2xl font-semibold">Nenhum produto encontrado</h2>
                  <p className="mt-3 text-sm text-ink/60">Ajuste os filtros para ver mais opções da curadoria.</p>
                  <button className="button-primary mt-6" type="button" onClick={clearFilters}>
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 bg-ink/45 lg:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto h-full w-[min(90vw,390px)] overflow-y-auto bg-mist p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button className="icon-button" type="button" aria-label="Fechar filtros" onClick={() => setFiltersOpen(false)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            {filterPanel}
            <button className="button-primary mt-5 w-full" type="button" onClick={() => setFiltersOpen(false)}>
              Ver produtos
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
