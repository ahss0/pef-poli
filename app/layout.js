import "../styles/globals.css";
import "../styles/professores.css";
import "../styles/extensao.css";
import "../styles/noticias.css";
import "../styles/laboratorios.css";
import "../styles/pos-graduacao.css"
import "../styles/graduacao.css"
import "../styles/teses.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PEF USP",
  description:
    "Departamento de Engenharia de Estruturas e Geotécnica — USP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <Header />
        <div id="conteudo">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
