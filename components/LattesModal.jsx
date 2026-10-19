"use client";

// components/LattesModal.jsx
// Card flutuante com fundo escurecido mostrando o Lattes do professor
// selecionado num iframe. Fecha no botão "×", clicando fora, ou com Esc.
import { useEffect } from "react";

export default function LattesModal({ professor, onClose }) {
  useEffect(() => {
    if (!professor) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [professor, onClose]);

  if (!professor) return null;

  return (
    <div
      className="lattes-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="lattes-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Currículo Lattes de ${professor.nome}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lattes-modal-header">
          <span>{professor.nome} — Currículo Lattes</span>
          <button
            type="button"
            className="lattes-modal-close"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="lattes-modal-body">
          <iframe
            src={professor.lattes}
            title={`Currículo Lattes de ${professor.nome}`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
