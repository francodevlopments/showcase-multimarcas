import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../data/products";
import { siteConfig } from "../data/site";

export default function Footer() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Vi o site da Urban Select e quero saber mais.",
  )}`;

  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link to="/" className="inline-block">
              <span className="block text-xl font-black uppercase tracking-[0.18em]">{siteConfig.logo.primary}</span>
              <span className="-mt-1 block text-xs font-semibold uppercase tracking-[0.42em] text-brass">
                {siteConfig.logo.secondary}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/68">
              Loja multimarcas de moda urbana premium com curadoria de roupas, calçados e acessórios para a rotina.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">Categorias</h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/70">
              {categories.slice(0, 6).map((category) => (
                <li key={category}>
                  <Link className="transition hover:text-white" to={`/catalogo?categoria=${encodeURIComponent(category)}`}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">Institucional</h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/70">
              <li>
                <Link className="transition hover:text-white" to="/sobre">
                  Sobre a loja
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/contato">
                  Contato
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/catalogo?ofertas=true">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/carrinho">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sand">Atendimento</h2>
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              <a className="flex gap-3 transition hover:text-white" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp comercial
              </a>
              <a
                className="flex gap-3 transition hover:text-white"
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} aria-hidden="true" />
                Instagram
              </a>
              <span className="flex gap-3">
                <Mail size={18} aria-hidden="true" />
                {siteConfig.email}
              </span>
              <span className="flex gap-3">
                <MapPin size={18} aria-hidden="true" />
                {siteConfig.address}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Urban Select. Todos os direitos reservados.</p>
          <p>Política de troca · Privacidade · Termos</p>
        </div>
      </div>
    </footer>
  );
}
