import { Clock, Instagram, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { siteConfig } from "../data/site";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Contact() {
  usePageMeta(
    "Contato | Urban Select",
    "Fale com a Urban Select pelo WhatsApp, Instagram, endereço da loja e formulário de contato.",
  );

  const { notify } = useStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Dúvida sobre produto",
    message: "",
  });

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Olá! Vim pelo site da Urban Select e quero atendimento.",
  )}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    notify("Mensagem enviada para atendimento");
    setForm({ name: "", email: "", subject: "Dúvida sobre produto", message: "" });
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-3">Contato</p>
            <h1 className="text-4xl font-semibold md:text-5xl">Atendimento Urban Select</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-ink/62">
              Tire dúvidas sobre produtos, tamanhos, entrega, trocas ou disponibilidade na loja.
            </p>

            <div className="mt-8 grid gap-4">
              <a className="flex gap-4 border border-ink/10 bg-white p-5 transition hover:border-olive" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="shrink-0 text-olive" size={24} aria-hidden="true" />
                <span>
                  <strong className="block">WhatsApp</strong>
                  <span className="mt-1 block text-sm text-ink/60">(11) 99999-9999</span>
                </span>
              </a>

              <a className="flex gap-4 border border-ink/10 bg-white p-5 transition hover:border-olive" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
                <Instagram className="shrink-0 text-olive" size={24} aria-hidden="true" />
                <span>
                  <strong className="block">Instagram</strong>
                  <span className="mt-1 block text-sm text-ink/60">@urbanselect.store</span>
                </span>
              </a>

              <div className="flex gap-4 border border-ink/10 bg-white p-5">
                <MapPin className="shrink-0 text-olive" size={24} aria-hidden="true" />
                <span>
                  <strong className="block">Endereço</strong>
                  <span className="mt-1 block text-sm text-ink/60">{siteConfig.address}</span>
                </span>
              </div>

              <div className="flex gap-4 border border-ink/10 bg-white p-5">
                <Clock className="shrink-0 text-olive" size={24} aria-hidden="true" />
                <span>
                  <strong className="block">Horários</strong>
                  <span className="mt-1 block text-sm text-ink/60">{siteConfig.hours}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="border border-ink/10 bg-white p-5 shadow-soft sm:p-7">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Envie uma mensagem</h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">Responderemos no próximo horário de atendimento.</p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold" htmlFor="name">
                    Nome
                  </label>
                  <input
                    id="name"
                    className="field"
                    value={form.name}
                    required
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    className="field"
                    type="email"
                    value={form.email}
                    required
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="subject">
                  Assunto
                </label>
                <select
                  id="subject"
                  className="field"
                  value={form.subject}
                  onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                >
                  <option>Dúvida sobre produto</option>
                  <option>Troca ou devolução</option>
                  <option>Disponibilidade na loja</option>
                  <option>Parceria de marca</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="message">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  className="field min-h-36 resize-y"
                  value={form.message}
                  required
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                />
              </div>

              <button className="button-primary w-full sm:w-fit" type="submit">
                <Send size={18} aria-hidden="true" />
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
