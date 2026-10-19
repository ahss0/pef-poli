"use client";
import Link from "next/link";

export default function ExtensaoPage() {

  return (
    <main>
      <section className="container extensao">
        <h1>Programa de Pós-Graduação</h1>


        <p>
          O Programa de Pós-Graduação em Engenharia Civil (PPGEC), criado em 1970, tem por objetivo formar Mestres e Doutores capazes de detectar as necessidades relevantes da sociedade brasileira e propor soluções e métodos inovadores nas áreas de Engenharia de Construção Civil e Urbana, Engenharia de Estruturas, Engenharia Geotécnica e Engenharia Hidráulica e Ambiental.
          O Programa é nota 6 pela CAPES e visa capacitar pesquisadores de ponta com inserção internacional para atuar tanto em atividades acadêmicas de ensino e pesquisa quanto em pesquisas aplicadas dos setores industrial, público e de mercado.
        </p><br />
        <Link className="btn" href="https://www.poli.usp.br/ppgec/">Clique aqui</Link>
      </section>
    </main>
  );
}

