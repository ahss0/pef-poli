"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchNoticiaById } from "@/lib/strapi";

// Renderiza um arquivo de forma diferente conforme o tipo (imagem, pdf, ou
// outro formato genérico como doc/xls/zip).
function ArquivoItem({ arquivo }) {
  const isImagem = arquivo.mime?.startsWith("image/");
  const isPdf =
    arquivo.mime === "application/pdf" || arquivo.ext?.toLowerCase() === ".pdf";

  if (isImagem) {
    return (
      <a
        href={arquivo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="noticia-arquivo noticia-arquivo--imagem"
      >
        <img src={arquivo.url} alt={arquivo.nome} />
        <span className="noticia-arquivo-nome">{arquivo.nome}</span>
      </a>
    );
  }

  if (isPdf) {
    return (
      <a
        href={arquivo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="noticia-arquivo noticia-arquivo--pdf"
      >
        <span className="noticia-arquivo-icone" aria-hidden="true">
          PDF
        </span>
        <span className="noticia-arquivo-nome">{arquivo.nome}</span>
      </a>
    );
  }

  // Fallback genérico para outros tipos (doc, xls, zip, etc.)
  const extensao = (arquivo.ext || "").replace(".", "").toUpperCase() || "ARQ";
  return (
    <a
      href={arquivo.url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="noticia-arquivo noticia-arquivo--generico"
    >
      <span className="noticia-arquivo-icone" aria-hidden="true">
        {extensao}
      </span>
      <span className="noticia-arquivo-nome">{arquivo.nome}</span>
    </a>
  );
}

export default function NoticiaPage() {
  const { id } = useParams();

  const [noticia, setNoticia] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "not-found" | "error"

  useEffect(() => {
    let cancelled = false;

    async function loadNoticia() {
      try {
        const data = await fetchNoticiaById(id);
        if (cancelled) return;

        if (!data) {
          setStatus("not-found");
          return;
        }

        setNoticia(data);
        setStatus("ready");
      } catch (err) {
        console.error("Erro ao carregar notícia:", err);
        if (!cancelled) setStatus("error");
      }
    }

    loadNoticia();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <section className="section">
        <div className="container">
          <p>Carregando notícia...</p>
        </div>
      </section>
    );
  }

  if (status === "not-found") {
    return (
      <section className="section">
        <div className="container">
          <h1>Notícia não encontrada</h1>
          <p>Essa notícia pode ter sido removida ou o link está incorreto.</p>
          <Link href="/" className="btn">
            Voltar para a home
          </Link>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="section">
        <div className="container">
          <h1>Não foi possível carregar a notícia</h1>
          <p>Tente novamente em instantes.</p>
          <Link href="/" className="btn">
            Voltar para a home
          </Link>
        </div>
      </section>
    );
  }

  const temArquivos = noticia.arquivos && noticia.arquivos.length > 0;
  const temLinks = noticia.links && noticia.links.length > 0;

  return (
    <article className="section">
      <div className="container noticia-detail">
        {/* 1. Título */}
        <h1 className="noticia-detail-titulo">{noticia.titulo}</h1>

        {noticia.data_postagem && (<div className="noticia-data">Postado em {noticia.data_postagem}</div>
        )}

        {/* 2. Foto da notícia, em tamanho médio, só se houver */}
        {noticia.imagem && (
          <img
            className="noticia-detail-img"
            src={noticia.imagem}
            alt={noticia.titulo}
          />
        )}

        {/* 3. Corpo do texto */}
        {noticia.corpo_texto && (
          <div className="noticia-detail-corpo">{noticia.corpo_texto}</div>
        )}

        {/* 4. Arquivos da notícia (pdfs, imagens, outros) */}
        {temArquivos && (
          <section className="noticia-arquivos" aria-labelledby="arquivos-title">
            <h2 id="arquivos-title">Arquivos</h2>
            <div className="noticia-arquivos-lista">
              {noticia.arquivos.map((arquivo) => (
                <ArquivoItem key={arquivo.url} arquivo={arquivo} />
              ))}
            </div>
          </section>
        )}

        {/* 5. Links relacionados, no final */}
        {temLinks && (
          <section className="noticia-links" aria-labelledby="links-title">
            <h2 id="links-title">Links</h2>
            <ul className="noticia-links-lista">
              {noticia.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
