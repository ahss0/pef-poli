"use client";

import { useEffect, useState } from "react";
import { fetchProfessores } from "@/lib/strapi";
import ProfessorCard from "@/components/ProfessorCard";
import LattesModal from "@/components/LattesModal";

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    let ativo = true;

    fetchProfessores()
      .then((dados) => {
        if (ativo) setProfessores(dados);
      })
      .catch((err) => {
        if (ativo) setErro(err.message);
      })
      .finally(() => {
        if (ativo) setLoading(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <main>
      <section className="container">
        <h1>Nossos Professores</h1>

        {loading && <p className="prof-status">Carregando professores…</p>}

        {erro && (
          <p className="prof-status prof-status--erro">
            Não foi possível carregar os professores: {erro}
          </p>
        )}

        {!loading && !erro && (
          <div className="prof-grid">
            {professores.map((prof) => (
              <ProfessorCard
                key={prof.id}
                professor={prof}
                onOpenLattes={setSelecionado}
              />
            ))}
          </div>
        )}
      </section>

      <LattesModal
        professor={selecionado}
        onClose={() => setSelecionado(null)}
      />
    </main>
  );
}
