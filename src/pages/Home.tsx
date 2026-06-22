import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import SectionHeader from "../components/SectionHeader";
import { brands } from "../data/site";
import { products } from "../data/products";
import { usePageMeta } from "../hooks/usePageMeta";

const categoryTiles = [
  {
    title: "Camisetas premium",
    label: "Camisetas",
    href: "/catalogo?categoria=Camisetas",
    image: "/images/category-camisetas.png",
  },
  {
    title: "Moletons e jaquetas",
    label: "Moletons",
    href: "/catalogo?categoria=Moletons",
    image: "/images/category-moletons.png",
  },
  {
    title: "Tênis urbanos",
    label: "Tênis",
    href: "/catalogo?categoria=Tênis",
    image: "/images/category-tenis.png",
  },
  {
    title: "Bolsas e acessórios",
    label: "Acessórios",
    href: "/catalogo?categoria=Acessórios",
    image: "/images/category-acessorios.png",
  },
];

const testimonials = [
  {
    name: "Marina Costa",
    text: "As peças têm acabamento de loja premium e o visual do catálogo passa muita confiança.",
  },
  {
    name: "Rafael Nunes",
    text: "Gostei da seleção multimarcas. Consegui montar um look completo em poucos cliques.",
  },
  {
    name: "Bianca Prado",
    text: "A experiência mobile parece de e-commerce real, com filtros claros e carrinho fácil de usar.",
  },
];

export default function Home() {
  usePageMeta(
    "Urban Select | Moda urbana premium",
    "Showcase da Urban Select, loja multimarcas fictícia de moda urbana premium com catálogo, ofertas e atendimento por WhatsApp.",
  );

  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const latest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);

  return (
    <>
      <section className="relative isolate min-h-[72vh] overflow-hidden bg-ink text-white">
        <img
          src="/images/hero-urban-select.png"
          alt="Interior premium de loja urbana com roupas, tênis e acessórios selecionados"
          className="absolute inset-0 h-full w-full object-cover opacity-72 banner-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-ink/20" />
        <div className="container-page relative flex min-h-[72vh] items-center py-16">
          <div className="max-w-2xl fade-in">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sand">
              Coleção urbana 2026
            </p>
            <h1 className="text-5xl font-semibold leading-[0.96] tracking-normal sm:text-6xl lg:text-7xl">
              Urban Select
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/76 sm:text-lg">
              Multimarcas de roupas, calçados e acessórios com curadoria premium, linguagem urbana e compra visual
              fluida do primeiro clique ao carrinho.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary bg-white text-ink hover:bg-sand" to="/catalogo?genero=Masculino">
                Comprar masculino
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-sm border border-white/45 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-ink"
                to="/catalogo?genero=Feminino"
              >
                Comprar feminino
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Frete grátis", text: "Acima de R$ 299 para todo o Brasil" },
            { icon: ShieldCheck, title: "Compra segura", text: "Jornada clara com carrinho, cupons e atendimento" },
            { icon: Star, title: "Curadoria premium", text: "Marcas selecionadas com visual urbano contemporâneo" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 border border-ink/10 bg-mist p-4">
              <item.icon className="text-olive" size={24} aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">{item.title}</h2>
                <p className="mt-1 text-xs leading-5 text-ink/60">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeader
            eyebrow="Categorias"
            title="Entre pelas peças que movem a rotina urbana"
            description="Atalhos visuais para linhas essenciais do catálogo."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryTiles.map((category) => (
              <Link
                key={category.title}
                to={category.href}
                className="group relative min-h-72 overflow-hidden rounded-sm bg-ink text-white"
              >
                <img
                  src={category.image}
                  alt={`Categoria ${category.label} da Urban Select`}
                  className="absolute inset-0 h-full w-full object-cover opacity-82 transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/18 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">{category.label}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page">
          <SectionHeader
            eyebrow="Destaques"
            title="Peças com maior apelo visual"
            description="Produtos selecionados com preços promocionais, variações de cor e favoritos."
            actionLabel="Ver catálogo"
            actionHref="/catalogo"
          />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeader eyebrow="Lançamentos" title="Novidades da vitrine" actionLabel="Ver novidades" actionHref="/catalogo?ordenar=novidades" />
          <ProductGrid products={latest} />
        </div>
      </section>

      <section className="bg-ink py-12 text-white">
        <div className="container-page grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">Condição especial</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Frete grátis acima de R$ 299</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
              Válido para roupas, calçados e acessórios selecionados enquanto durarem os estoques.
            </p>
          </div>
          <Link className="button-primary justify-self-start bg-white text-ink hover:bg-sand md:justify-self-end" to="/catalogo?ofertas=true">
            Ver ofertas
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page">
          <SectionHeader eyebrow="Mais vendidos" title="Produtos com maior procura" />
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <SectionHeader
            eyebrow="Marcas"
            title="Curadoria multimarcas com leitura premium"
            description="Diferentes linhas de roupa, calçado e acessório em uma seleção urbana coesa."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {brands.map((brand) => (
              <div key={brand} className="grid min-h-24 place-items-center border border-ink/10 bg-white px-4 text-center">
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-ink/72">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page">
          <SectionHeader eyebrow="Avaliações" title="O que clientes dizem" />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="border border-ink/10 bg-mist p-6">
                <div className="mb-4 flex gap-1 text-brass" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-sm leading-6 text-ink/72">“{testimonial.text}”</blockquote>
                <figcaption className="mt-5 text-sm font-bold">{testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page">
          <div className="grid gap-6 border border-ink/10 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow mb-3">Newsletter</p>
              <h2 className="text-3xl font-semibold">Receba drops, ofertas e novas marcas</h2>
              <p className="mt-3 text-sm leading-6 text-ink/62">
                Novas coleções, reposições e condições especiais direto no seu e-mail.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="newsletter-email">
                E-mail
              </label>
              <input id="newsletter-email" className="field" type="email" placeholder="seuemail@exemplo.com" />
              <button className="button-primary shrink-0" type="submit">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
