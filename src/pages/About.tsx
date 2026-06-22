import { CheckCircle2, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

const values = [
  {
    icon: Sparkles,
    title: "Curadoria enxuta",
    text: "Selecionamos peças que conversam entre si para facilitar combinações completas.",
  },
  {
    icon: Ruler,
    title: "Caimento como prioridade",
    text: "Cada produto destaca tamanho, material e proposta de uso com clareza.",
  },
  {
    icon: ShieldCheck,
    title: "Atendimento próximo",
    text: "WhatsApp, redes sociais e loja física conectados para uma compra mais simples.",
  },
];

export default function About() {
  usePageMeta(
    "Sobre | Urban Select",
    "Conheça a história, missão e diferenciais da Urban Select, loja multimarcas de moda urbana premium.",
  );

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img
          src="/images/about-store.png"
          alt="Fachada e vitrine da Urban Select com roupas urbanas premium"
          className="absolute inset-0 h-full w-full object-cover opacity-58"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/74 to-ink/25" />
        <div className="container-page relative flex min-h-[52vh] items-center py-16">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-sand">Sobre a loja</p>
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">Curadoria urbana com presença premium</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/74">
              A Urban Select nasceu para reunir marcas independentes e essenciais contemporâneos em uma experiência de
              compra direta, visual e confiável.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/about-rack.png"
              alt="Arara com camisetas, jaquetas e calças selecionadas"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <img
              src="/images/about-details.png"
              alt="Mesa com tênis, bolsa e acessórios da loja"
              className="mt-10 aspect-[4/5] w-full rounded-sm object-cover"
            />
          </div>

          <div>
            <p className="eyebrow mb-3">História</p>
            <h2 className="text-4xl font-semibold">Uma loja pensada para quem compra por estilo e praticidade</h2>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-ink/68">
              <p>
                A primeira seleção da Urban Select foi montada em São Paulo, combinando camisetas de algodão premium,
                calças utilitárias, tênis versáteis e acessórios de acabamento limpo.
              </p>
              <p>
                A loja trabalha com drops menores, reposições constantes e atendimento consultivo para que cada cliente
                encontre peças fáceis de usar, mas com presença visual.
              </p>
            </div>
            <Link className="button-primary mt-7" to="/catalogo">
              Conhecer catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-3">Missão</p>
            <h2 className="text-3xl font-semibold">Simplificar a compra de moda urbana com confiança.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border border-ink/10 bg-mist p-5">
                <value.icon className="mb-5 text-olive" size={28} aria-hidden="true" />
                <h3 className="font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/62">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-3">Diferenciais</p>
            <h2 className="text-4xl font-semibold">Da vitrine ao atendimento, tudo precisa parecer claro.</h2>
          </div>
          <ul className="grid gap-4">
            {[
              "Produtos com descrição objetiva, material e informação de entrega.",
              "Carrinho com variações de cor, tamanho, quantidade e cupom.",
              "Atendimento por WhatsApp para dúvidas rápidas antes da compra.",
              "Categorias organizadas para compras por linha, uso e estilo.",
            ].map((item) => (
              <li key={item} className="flex gap-3 border-b border-ink/10 pb-4 text-sm leading-6 text-ink/70">
                <CheckCircle2 className="mt-0.5 shrink-0 text-olive" size={19} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
