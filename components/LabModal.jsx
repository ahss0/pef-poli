"use client";

import { useEffect, useRef } from "react";

export default function LabModal({ lab, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden"; // trava o scroll da página
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.(); // devolve o foco ao card
    };
  }, [onClose]);

  return (
    <div className="lab-modal-overlay" onClick={onClose}>
      <div
        className="lab-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="lab-modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <header className="lab-modal-header">
          <span className="lab-modal-sigla">{lab.sigla}</span>
          <h2 id="lab-modal-title">{lab.nome}</h2>
          <p className="lab-modal-meta">
            {lab.departamento} · {lab.coordenacao}
          </p>
        </header>

        <div className="lab-modal-body">
          <p>{lab.descricao}</p>

          {lab.palavrasChave?.length > 0 && (
            <ul className="lab-modal-tags" aria-label="Palavras-chave">
              {lab.palavrasChave.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </div>

        <footer className="lab-modal-footer">
          <a href={lab.siteUrl} target="_blank" rel="noopener noreferrer">
            Visitar {lab.site} ↗
          </a>
        </footer>
      </div>
    </div>
  );
}
