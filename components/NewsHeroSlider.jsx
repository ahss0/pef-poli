"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchNoticias } from "@/lib/strapi";

// Mesmo fallback usado no HeroSlider da home.
const DEFAULT_IMAGE = "/img/slide1.jpg";

export default function NewsHeroSlider() {
  const [noticias, setNoticias] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error" | "empty"
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadNoticias() {
      try {
        const data = await fetchNoticias();
        if (cancelled) return;

        if (!data || data.length === 0) {
          setStatus("empty");
          return;
        }

        setNoticias(data);
        setStatus("ready");
      } catch (err) {
        console.error("Erro ao carregar notícias do slider compacto:", err);
        if (!cancelled) setStatus("error");
      }
    }

    loadNoticias();
    return () => {
      cancelled = true;
    };
  }, []);

  function handlePrev() {
    setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % noticias.length);
  }

  if (status === "loading") {
    return (
      <div className="news-hero-wrapper">
        <div className="news-hero news-hero--loading" aria-label="Carregando destaques" />
      </div>
    );
  }

  if (status === "error" || status === "empty") {
    return null;
  }

  const atual = noticias[currentIndex];
  const total = noticias.length;

  return (
    <div className="news-hero-wrapper">
      <div className="news-hero" aria-label="Notícias em destaque">
        <div className="news-hero-image">
          <img
            src={atual.imagem || DEFAULT_IMAGE}
            alt={atual.titulo || "Notícia em destaque"}
          />
          <span className="news-hero-tag">Destaque</span>
        </div>

        <div className="news-hero-content">
          {total > 1 && (
            <span className="news-hero-index">
              {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          )}

          <h2 className="news-hero-title">{atual.titulo}</h2>

          {atual.corpo_texto && (
            <p className="news-hero-excerpt">{atual.corpo_texto}</p>
          )}

          <div className="news-hero-footer">
            <Link href={`/noticias/${atual.id}`} className="news-hero-link">
              Ver notícia
            </Link>

            {total > 1 && (
              <div className="news-hero-controls">
                <button
                  type="button"
                  className="news-hero-nav-btn"
                  aria-label="Notícia anterior"
                  onClick={handlePrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="news-hero-nav-btn"
                  aria-label="Próxima notícia"
                  onClick={handleNext}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
