import { MessageCircle, Minus, Plus, ShoppingBag, Ticket, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import { siteConfig } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatCurrency } from "../utils/format";

export default function Cart() {
  usePageMeta(
    "Carrinho | Urban Select",
    "Carrinho visual da Urban Select com alteração de quantidade, cupom, subtotal e finalização por atendimento.",
  );

  const { cart, subtotal, updateCartItem, removeCartItem, notify } = useStore();
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "applied" | "invalid">("idle");

  const cartEntries = cart
    .map((item, index) => ({
      item,
      index,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((entry): entry is typeof entry & { product: NonNullable<(typeof entry)["product"]> } =>
      Boolean(entry.product),
    );

  const discount = couponStatus === "applied" ? subtotal * 0.1 : 0;
  const shipping = subtotal === 0 || subtotal >= 299 ? 0 : 19.9;
  const total = Math.max(0, subtotal - discount + shipping);

  const whatsappHref = useMemo(() => {
    const summary = cartEntries
      .map(({ product, item }) => `${item.quantity}x ${product.name} - ${item.color} - ${item.size}`)
      .join("\n");

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      `Olá! Quero finalizar meu pedido Urban Select:\n${summary}\nTotal: ${formatCurrency(total)}`,
    )}`;
  }, [cartEntries, total]);

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "URBAN10") {
      setCouponStatus("applied");
      notify("Cupom URBAN10 aplicado");
      return;
    }

    setCouponStatus("invalid");
  }

  if (cartEntries.length === 0) {
    return (
      <section className="container-page grid min-h-[60vh] place-items-center py-16 text-center">
        <div className="max-w-md">
          <ShoppingBag className="mx-auto mb-5 text-olive" size={42} aria-hidden="true" />
          <p className="eyebrow mb-3">Carrinho</p>
          <h1 className="text-4xl font-semibold">Seu carrinho está vazio</h1>
          <p className="mt-3 text-sm leading-6 text-ink/62">
            Explore o catálogo e adicione peças para montar seu pedido.
          </p>
          <Link className="button-primary mt-6" to="/catalogo">
            Ver produtos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="mb-8">
          <p className="eyebrow mb-3">Carrinho</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Resumo do pedido</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4">
            {cartEntries.map(({ item, index, product }) => (
              <article key={`${item.productId}-${item.size}-${item.color}-${index}`} className="border border-ink/10 bg-white p-4">
                <div className="grid gap-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                  <Link to={`/produto/${product.slug}`} className="overflow-hidden rounded-sm bg-mist">
                    <img
                      src={product.images[0]}
                      alt={`${product.name} no carrinho`}
                      className="aspect-square h-full w-full object-cover"
                    />
                  </Link>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">{product.brand}</p>
                    <Link to={`/produto/${product.slug}`} className="mt-1 block text-lg font-semibold hover:text-olive">
                      {product.name}
                    </Link>
                    <p className="mt-2 text-sm text-ink/58">
                      {item.color} · Tamanho {item.size}
                    </p>
                    <p className="mt-3 text-base font-bold">{formatCurrency(product.price)}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="inline-flex items-center border border-ink/15 bg-white">
                      <button
                        className="grid h-10 w-10 place-items-center transition hover:bg-mist"
                        type="button"
                        aria-label="Diminuir quantidade"
                        onClick={() => updateCartItem(index, item.quantity - 1)}
                      >
                        <Minus size={15} aria-hidden="true" />
                      </button>
                      <span className="grid h-10 min-w-10 place-items-center text-sm font-bold">{item.quantity}</span>
                      <button
                        className="grid h-10 w-10 place-items-center transition hover:bg-mist"
                        type="button"
                        aria-label="Aumentar quantidade"
                        onClick={() => updateCartItem(index, item.quantity + 1)}
                      >
                        <Plus size={15} aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink/50 transition hover:text-ink"
                      type="button"
                      onClick={() => removeCartItem(index)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      Remover
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit border border-ink/10 bg-white p-5 shadow-soft lg:sticky lg:top-28">
            <h2 className="text-xl font-semibold">Pagamento</h2>

            <div className="mt-5 border-b border-ink/10 pb-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/50" htmlFor="coupon">
                Cupom
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/42" size={17} />
                  <input
                    id="coupon"
                    className="field pl-10"
                    value={coupon}
                    placeholder="URBAN10"
                    onChange={(event) => {
                      setCoupon(event.target.value);
                      setCouponStatus("idle");
                    }}
                  />
                </div>
                <button className="button-secondary px-4" type="button" onClick={applyCoupon}>
                  Aplicar
                </button>
              </div>
              {couponStatus === "applied" && <p className="mt-2 text-xs font-semibold text-olive">10% de desconto aplicado.</p>}
              {couponStatus === "invalid" && <p className="mt-2 text-xs font-semibold text-red-700">Cupom não encontrado.</p>}
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink/58">Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/58">Desconto</span>
                <strong>- {formatCurrency(discount)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/58">Frete</span>
                <strong>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</strong>
              </div>
              <div className="mt-2 flex justify-between border-t border-ink/10 pt-4 text-base">
                <span className="font-bold">Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
            </div>

            <button className="button-primary mt-6 w-full" type="button" onClick={() => notify("Pedido pronto para finalizar")}>
              Finalizar compra
            </button>
            <a className="button-secondary mt-3 w-full border-olive/35 text-olive hover:border-olive" href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              Enviar pedido no WhatsApp
            </a>
            <Link className="mt-4 block text-center text-sm font-semibold text-ink/62 hover:text-ink" to="/catalogo">
              Continuar comprando
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
