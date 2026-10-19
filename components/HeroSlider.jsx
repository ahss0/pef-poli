"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchNoticias } from "@/lib/strapi";

// Imagem exibida quando a notícia não tem campo "imagem" preenchido no Strapi.
// Coloque um arquivo em public/img/slide-default.jpg.
const DEFAULT_IMAGE = "/img/slide1.jpg";

const AUTO_INTERVAL = 5000;

export default function HeroSlider() {
  const [noticias, setNoticias] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error" | "empty"
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // Busca as notícias em destaque assim que o componente monta.
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
        console.error("Erro ao carregar notícias do slider:", err);
        if (!cancelled) setStatus("error");
      }
    }

    loadNoticias();
    return () => {
      cancelled = true;
    };
  }, []);

  function stopAutoPlay() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (noticias.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % noticias.length);
    }, AUTO_INTERVAL);
  }

  // Autoplay e navegação por teclado só fazem sentido depois que as notícias chegam.
  useEffect(() => {
    if (status !== "ready") return;

    startAutoPlay();

    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
        startAutoPlay();
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % noticias.length);
        startAutoPlay();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      stopAutoPlay();
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, noticias.length]);

  function handlePrev(e) {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
    startAutoPlay();
  }

  function handleNext(e) {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % noticias.length);
    startAutoPlay();
  }

  function handleDotClick(e, index) {
    e.stopPropagation();
    setCurrentIndex(index);
    startAutoPlay();
  }

  if (status === "loading") {
    return (
      <div className="hero-wrapper">
        <div className="hero hero--loading" aria-label="Carregando destaques" />
      </div>
    );
  }

  // Sem notícias em destaque ou erro na API: não quebra a página, só não renderiza o slider.
  if (status === "error" || status === "empty") {
    return null;
  }

  const atual = noticias[currentIndex];

  return (
    <div className="hero-wrapper">
      <div
        className="hero"
        aria-label="Notícias em destaque"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div
          className="hero-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {noticias.map((noticia) => (
            <div
              key={noticia.id}
              className="hero-slide"
              style={{
                backgroundImage: `url('${noticia.imagem || DEFAULT_IMAGE}')`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <h1>{atual.titulo}</h1>
          <div className="hero-actions">
            {atual.corpo_texto && <p>{atual.corpo_texto}</p>}
            <Link
              href={`/noticias/${atual.id}`}
              className="btn"
              onClick={(e) => e.stopPropagation()}
            >
              Ver notícia
            </Link>
          </div>
        </div>

        {noticias.length > 1 && (
          <>
            <button
              className="hero-nav-btn hero-nav-btn--prev"
              aria-label="Slide anterior"
              onClick={handlePrev}
            >
              ‹
            </button>
            <button
              className="hero-nav-btn hero-nav-btn--next"
              aria-label="Próximo slide"
              onClick={handleNext}
            >
              ›
            </button>

            <div className="hero-dots" aria-hidden="true">
              {noticias.map((noticia, i) => (
                <button
                  key={noticia.id}
                  className={i === currentIndex ? "is-active" : ""}
                  aria-label={`Slide ${i + 1}`}
                  onClick={(e) => handleDotClick(e, i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
