"use client";

import { useEffect, useState } from "react";
import { fetchFuncionarios } from "@/lib/strapi";

export default function FuncionariosPage() {

  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    fetchFuncionarios()
      .then((dados) => {
        if (ativo) setFuncionarios(dados);
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
      <section className="container func-page">
        <h1>Nossos Funcionários</h1>

        {loading && <p className="prof-status">Carregando funcionários…</p>}

        {erro && (
          <p className="prof-status prof-status--erro">
            Não foi possível carregar os funcionários: {erro}
          </p>
        )}

        {!loading && !erro && (
          <ul className="func-list">
            {funcionarios.map((f) => (
              <li key={f.nome} className="func-item">
                <p className="func-nome">{f.nome}</p>
                {f.funcao && <p className="func-funcao">{f.funcao}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

