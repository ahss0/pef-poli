import HeroSlider from "@/components/HeroSlider";

export const metadata = {
  title: "Home | PEF USP",
};

export default function HomePage() {
  return (
    <>
      {/* Hero e Notícias lado a lado em telas largas; empilhados quando não couberem */}
      <div className="home-top-grid">
        <HeroSlider />

        {/* ===== NOTÍCIAS (LinkedIn Widget) ===== */}
        <section className="section home-news-section" aria-labelledby="noticias-title">
          <div className="container">
            <div className="news-panel">
              <div className="section-head">
                <div>
                  <span className="eyebrow">Fique por dentro</span>
                  <h2 className="section-title" id="noticias-title">
                    Confira as últimas <span>notícias</span> do
                    Depto. de Engenharia de Estruturas e Geotécnica
                  </h2>
                </div>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener" className="link-arrow">
                  Ver perfil no LinkedIn →
                </a>
              </div>
              <iframe
                className="news-iframe"
                src="https://widgets.sociablekit.com/linkedin-profile-posts/iframe/25706836"
                frameBorder="0"
                width="100%"
                height="1000px"
              ></iframe>
            </div>
          </div>
        </section>
      </div>


      {/* ===== CONTATO ===== */}
      <section
        className="section section--alt"
        id="contato"
        aria-labelledby="contato-title">

        <div className="container contact-wrap">
          <div className="contact-info">
            <span className="eyebrow">Contato</span>
            <h3 id="contato-title">
              Departamento de Engenharia de Estruturas e Geotécnica
            </h3>
            <p>Preencha o formulário abaixo ou entre em contato pelos números</p>

            <div className="addr">
              <p>
                <strong>Endereço</strong>
              </p>
              <p>Av. Professor Almeida Prado, Travessa 2, Nº 83</p>
              <p>Edifício de Engenharia Civil</p>
              <p>Cidade Universitária, São Paulo-SP</p>
              <p>CEP: 05508-070</p>
            </div>

            <div className="addr">
              <p>
                <strong>Tel:</strong> +55 (11) 3091-5489
              </p>
              <p>+55 (11) 3091-5680</p>
            </div>

            <form className="contact-form" noValidate>
              <input type="text" placeholder="Nome" required aria-required="true" />
              <input type="email" placeholder="Email" required aria-required="true" />
              <textarea placeholder="Mensagem" required aria-required="true"></textarea>
              <button type="submit" className="btn btn--solid">
                Enviar
              </button>
            </form>
          </div>

          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.090357342015!2d-46.729448684406164!3d-23.56042498468467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce562c807a5f23%3A0x5f2bc1df6414baaf!2sAv.%20Prof.%20Almeida%20Prado%2C%20Travessa%202%2C%20N%C2%BA%2083%20-%20Cidade%20Universit%C3%A1ria%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005508-070!5e0!3m2!1spt-BR!2sbr!4v1647534312345!5m2!1spt-BR!2sbr"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa do Departamento de Engenharia de Estruturas e Geotécnica da USP"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
