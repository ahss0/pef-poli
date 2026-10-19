
// Fontes: Biblioteca Digital de Teses e Dissertações da USP, filtradas por
// área de concentração + departamento PEF (id 3). Mantidas como constantes
// para caso seja preciso ajustar os filtros da busca no futuro.
const areas = [
  {
    titulo: "Engenharia Geotécnica",
    url: "https://teses.usp.br/?lang=pt-br&operadores%5B%5D=AND&campos%5B%5D=area&termos%5B%5D=Engenharia+Geot%C3%A9cnica&termos_exatos%5B%5D=1&operadores%5B%5D=AND&campos%5B%5D=departamento&termos%5B%5D=3&termos_exatos%5B%5D=0",
  },
  {
    titulo: "Engenharia de Estruturas",
    url: "https://teses.usp.br/?lang=pt-br&operadores%5B%5D=AND&campos%5B%5D=area&termos%5B%5D=engenharia+de+estruturas&termos_exatos%5B%5D=1&operadores%5B%5D=AND&campos%5B%5D=departamento&termos%5B%5D=3&termos_exatos%5B%5D=0",
  },
];

export const metadata = {
  title: "Teses e Dissertações | PEF-USP",
};

export default function TesesPage() {
  return (
    <main>
      <section className="container teses">
        <div className="teses-intro">
          <h1>Teses e Dissertações</h1>
          <p>
            Teses e dissertações do Departamento de Engenharia de Estruturas e
            Geotécnica (PEF), de acordo com a Biblioteca Digital de Teses e
            Dissertações da USP, organizadas por área de concentração.
          </p>
        </div>

        <div className="teses-grid">
          {areas.map((area) => (
            <div key={area.titulo} className="teses-area">
              <div className="teses-area-header">
                <h2>{area.titulo}</h2>
                <a href={area.url} target="_blank" rel="noopener noreferrer">
                  Abrir em nova aba ↗
                </a>
              </div>

              {/* O site da USP pode bloquear a exibição em iframe
                  (cabeçalho X-Frame-Options / CSP). Se a lista não aparecer
                  aqui, use o link "Abrir em nova aba" acima. */}
              <iframe
                src={area.url}
                title={`Teses e dissertações — ${area.titulo}`}
                className="teses-iframe"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
