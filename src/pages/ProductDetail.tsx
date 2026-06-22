import { Heart, MessageCircle, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import SectionHeader from "../components/SectionHeader";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import { siteConfig } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatCurrency, installmentText } from "../utils/format";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = useMemo(() => products.find((item) => item.slug === slug), [slug]);
  const fallback = product ?? products[0];
  const [selectedImage, setSelectedImage] = useState(fallback.images[0]);
  const [selectedSize, setSelectedSize] = useState(fallback.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(fallback.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleFavorite, isFavorite } = useStore();

  usePageMeta(
    product ? `${product.name} | Urban Select` : "Produto não encontrado | Urban Select",
    product
      ? `${product.name} da marca ${product.brand}. Escolha tamanho, cor e compre pelo WhatsApp.`
      : "Produto não encontrado na Urban Select.",
  );

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0].name);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <section className="container-page grid min-h-[56vh] place-items-center py-16 text-center">
        <div>
          <p className="eyebrow mb-3">Produto</p>
          <h1 className="text-4xl font-semibold">Produto não encontrado</h1>
          <Link className="button-primary mt-6" to="/catalogo">
            Voltar ao catálogo
          </Link>
        </div>
      </section>
    );
  }

  const favorite = isFavorite(product.id);
  const related = products
    .filter((item) => item.id !== product.id && (item.category === product.category || item.gender === product.gender))
    .slice(0, 4);
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Olá! Quero comprar o produto ${product.name} (${selectedColor}, tamanho ${selectedSize}).`,
  )}`;

  return (
    <>
      <section className="py-10 sm:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-sm border bg-white transition ${
                    selectedImage === image ? "border-ink" : "border-ink/10 hover:border-ink/35"
                  }`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Ver imagem ${index + 1} de ${product.name}`}
                >
                  <img
                    src={image}
                    alt={`${product.name}, visual ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="order-1 overflow-hidden rounded-sm bg-white lg:order-2">
              <img
                src={selectedImage}
                alt={`${product.name} da marca ${product.brand}`}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink/55">
                {product.brand}
              </span>
              <span className="rounded-sm bg-olive/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-olive">
                {product.category}
              </span>
              {product.originalPrice && (
                <span className="rounded-sm bg-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                  Oferta
                </span>
              )}
            </div>

            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{product.name}</h1>
            <div className="mt-5">
              {product.originalPrice && (
                <p className="text-sm text-ink/45 line-through">{formatCurrency(product.originalPrice)}</p>
              )}
              <p className="text-3xl font-bold">{formatCurrency(product.price)}</p>
              <p className="mt-1 text-sm font-medium text-ink/55">{installmentText(product.price)}</p>
            </div>

            <div className="mt-8 grid gap-6 border-y border-ink/10 py-7">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-bold">Tamanho</p>
                  <Link className="text-xs font-semibold text-olive hover:text-ink" to="/contato">
                    Guia de medidas
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`min-h-11 min-w-11 rounded-sm border px-3 text-sm font-semibold transition ${
                        selectedSize === size ? "border-ink bg-ink text-white" : "border-ink/15 bg-white hover:border-ink"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold">Cor: {selectedColor}</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`grid h-11 w-11 place-items-center rounded-sm border transition ${
                        selectedColor === color.name ? "border-ink" : "border-ink/15 hover:border-ink"
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Selecionar cor ${color.name}`}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-ink/20"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold">Quantidade</p>
                <div className="inline-flex items-center border border-ink/15 bg-white">
                  <button
                    className="grid h-11 w-11 place-items-center transition hover:bg-mist"
                    type="button"
                    aria-label="Diminuir quantidade"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  >
                    <Minus size={16} aria-hidden="true" />
                  </button>
                  <span className="grid h-11 min-w-12 place-items-center text-sm font-bold">{quantity}</span>
                  <button
                    className="grid h-11 w-11 place-items-center transition hover:bg-mist"
                    type="button"
                    aria-label="Aumentar quantidade"
                    onClick={() => setQuantity((current) => current + 1)}
                  >
                    <Plus size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                className="button-primary w-full"
                type="button"
                onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
              >
                <ShoppingBag size={18} aria-hidden="true" />
                Adicionar ao carrinho
              </button>
              <button
                className={`button-secondary px-4 ${favorite ? "border-olive text-olive" : ""}`}
                type="button"
                onClick={() => toggleFavorite(product.id)}
                aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart size={18} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            </div>

            <a className="button-secondary mt-3 w-full border-olive/35 text-olive hover:border-olive" href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              Comprar pelo WhatsApp
            </a>

            <div className="mt-7 grid gap-4 text-sm leading-6 text-ink/68">
              <div>
                <h2 className="mb-2 text-base font-bold text-ink">Descrição</h2>
                <p>{product.description}</p>
              </div>
              <div>
                <h2 className="mb-2 text-base font-bold text-ink">Material</h2>
                <p>{product.material}</p>
              </div>
              <div className="flex gap-3 border border-ink/10 bg-white p-4">
                <Truck className="mt-0.5 shrink-0 text-olive" size={20} aria-hidden="true" />
                <div>
                  <h2 className="mb-1 text-base font-bold text-ink">Informações de entrega</h2>
                  <p>{product.delivery}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page">
          <SectionHeader eyebrow="Relacionados" title="Continue explorando a curadoria" />
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  );
}
