import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function ScrollAndTitle() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <ScrollAndTitle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/produto/:slug" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="mx-auto flex min-h-[56vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-olive">
                  Página não encontrada
                </p>
                <h1 className="text-4xl font-semibold">Essa vitrine ainda não existe.</h1>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
