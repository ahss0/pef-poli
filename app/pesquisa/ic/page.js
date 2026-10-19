"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { fetchIC } from "@/lib/strapi";

export default function icPage() {

  const [ic, setConteudo] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    fetchIC()
      .then((dados) => {
        if (ativo) setConteudo(dados);
      })
      .catch((err) => {
        if (ativo) setErro(err.message);
      })

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <main>
      <section className="container extensao">
        <h1>Programa de Iniciação Científica</h1>


        <p>
          Quer produzir conhecimento e gerar impacto real para a sociedade? As pesquisas acadêmicas e aplicadas são essenciais no Departamento de Engenharia de Estruturas e Geotécnica e conectam nossos alunos à missão do departamento.

          Por meio do programa de Iniciação Científica, estudantes de graduação aprendem na prática como funciona a investigação científica. Basta escolher uma linha de pesquisa do seu interesse e alinhar o tema e a extensão do trabalho com um orientador.

          Acesse a apresentação e conheça as oportunidades de Iniciação Científica disponíveis no Departamento de Engenharia de Estruturas e Geotécnica da Poli-USP:
        </p><br />
        <Link className="btn" href="https://www.poli.usp.br/wp-content/uploads/2023/09/PEF.pdf">Clique aqui</Link>
      </section>
    </main>
  );
}

