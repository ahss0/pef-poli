"use client";

export default function LabCard({ lab, onOpen }) {
  return (
    <article className="lab-card">
      <header className="lab-card-header">
        <span className="lab-card-sigla">{lab.sigla}</span>
        <span className="lab-card-dept">{lab.departamento}</span>
      </header>

      <h2 className="lab-card-nome">{lab.nome}</h2>

      <dl className="lab-card-info">
        <div>
          <dt>Coordenação</dt>
          <dd>{lab.coordenacao}</dd>
        </div>
        <div>
          <dt>Telefone</dt>
          <dd>{lab.telefone}</dd>
        </div>
        <div>
          <dt>E-mail</dt>
          <dd>
            {lab.emails.map((email, i) => (
              <span key={email}>
                {i > 0 && ", "}
                <a href={`mailto:${email}`} className="lab-card-link">
                  {email}
                </a>
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt>Site</dt>
          <dd>
            <a
              href={lab.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lab-card-link"
            >
              {lab.site}
            </a>
          </dd>
        </div>
      </dl>

      {/* O botão "estica" sobre o card inteiro via ::after (ver CSS),
          então o card todo é clicável sem aninhar links dentro de <button>. */}
      <button
        type="button"
        className="lab-card-open"
        onClick={() => onOpen(lab)}
        aria-haspopup="dialog"
      >
        Ver descrição
      </button>
    </article>
  );
}
