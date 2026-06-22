import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import type { Product } from "../types";
import { formatCurrency } from "../utils/format";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorite = isFavorite(product.id);

  return (
    <article className="group fade-in">
      <div className="relative overflow-hidden rounded-sm bg-white">
        <Link to={`/produto/${product.slug}`} aria-label={`Ver ${product.name}`}>
          <img
            src={product.images[0]}
            alt={`${product.name} da marca ${product.brand}`}
            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            loading="lazy"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.originalPrice && (
            <span className="rounded-sm bg-ink px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Oferta
            </span>
          )}
          {product.isNew && (
            <span className="rounded-sm bg-olive px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Novo
            </span>
          )}
        </div>
        <button
          type="button"
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-sm border transition ${
            favorite
              ? "border-olive bg-olive text-white"
              : "border-ink/10 bg-white/92 text-ink hover:border-olive hover:text-olive"
          }`}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">{product.brand}</p>
            <Link to={`/produto/${product.slug}`} className="mt-1 block font-semibold text-ink hover:text-olive">
              {product.name}
            </Link>
          </div>
          <div className="flex shrink-0 gap-1 pt-1">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.name}
                className="h-3.5 w-3.5 rounded-full border border-ink/15"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-ink/45 line-through">{formatCurrency(product.originalPrice)}</p>
            )}
            <p className="text-base font-bold text-ink">{formatCurrency(product.price)}</p>
          </div>
          <button
            type="button"
            className="icon-button h-9 w-9"
            aria-label={`Adicionar ${product.name} ao carrinho`}
            onClick={() => addToCart(product, product.sizes[0], product.colors[0].name)}
          >
            <ShoppingBag size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
