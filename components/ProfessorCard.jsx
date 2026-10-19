"use client";

// components/ProfessorCard.jsx
// Ao clicar no card (fora dos links), abre o modal com o Lattes do professor.
// A abertura do modal é controlada pelo componente pai via `onOpenLattes`.
export default function ProfessorCard({ professor, onOpenLattes }) {
  const { nome, telefone, lattes, site, email, linkedin, foto } = professor;

  function handleCardClick() {
    if (lattes) onOpenLattes(professor);
  }

  function handleCardKeyDown(e) {
    if (lattes && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleCardClick();
    }
  }

  return (
    <div
      className={`prof-card${lattes ? " prof-card--clickable" : ""}`}
      onClick={lattes ? handleCardClick : undefined}
      onKeyDown={lattes ? handleCardKeyDown : undefined}
      role={lattes ? "button" : undefined}
      tabIndex={lattes ? 0 : undefined}
      aria-label={lattes ? `Ver currículo Lattes de ${nome}` : undefined}
    >
      <div className="prof-photo">
        <img
          src={foto || "/profile.png"}
          alt={`Foto de ${nome}`}
          loading="lazy"
        />
      </div>

      <h3>{nome}</h3>
      {telefone && <p>Tel: {telefone}</p>}

      <div className="prof-links">
        {lattes && (
          <a
            href={lattes}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
          >
            Lattes
          </a>
        )}
        {site && (
          <a
            href={site}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
          >
            Site
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
          >
            LinkedIn
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} onClick={(e) => e.stopPropagation()}>
            Email
          </a>
        )}
      </div>
    </div>
  );
}
