"use client";

import { useState } from "react";
import LabCard from "@/components/LabCard";
import LabModal from "@/components/LabModal";

// Client component que guarda o laboratório selecionado (mesmo padrão da página de professores).
// Fica separado de page.js para que a página continue sendo server component
// e possa exportar `metadata`.
export default function LabsGrid({ laboratorios }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="labs-grid">
        {laboratorios.map((lab) => (
          <LabCard key={lab.sigla} lab={lab} onOpen={setSelected} />
        ))}
      </div>

      {selected && (
        <LabModal lab={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
