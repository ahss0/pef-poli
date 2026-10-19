"use client";

import { useState } from "react";
import Link from "next/link";

// Estrutura do menu — troque os "#" pelas rotas reais conforme forem criadas.
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Quem somos",
    dropdown: [
      { label: "Organização administrativa", href: "#" },
      { label: "Professores", href: "/professores" },
    ],
  },
  {
    label: "Ensino",
    dropdown: [
      { label: "Graduação", href: "/ensino/graduacao" },
      { label: "Pós-graduação", href: "/ensino/pos-graduacao" },
    ],
  },
  {
    label: "Pesquisa", href: "/pesquisa",
    dropdown: [
      { label: "Laboratórios", href: "/pesquisa/lab" },
      { label: "Teses, Dissertações e Monografias", href: "/pesquisa/teses" },
      { label: "Mestrado/Doutorado", href: "/pesquisa/pos" },
      { label: "Iniciação Científica", href: "/pesquisa/ic" }
    ],
  },
  { label: "Extensão", href: "/extensao" },
  { label: "Notícias", href: "/noticias" },
  {
    label: "Mais",
    dropdown: [{ label: "Contato", href: "/#contato" }],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function toggleSubmenu(index) {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  }

  function closeAll() {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }

  return (
    <header>
      <div className="container topbar">
        <Link href="/" className="logo" aria-label="PEF" onClick={closeAll}>
          <img src="/img/logo.jpg" alt="Logo PEF USP" />
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`nav-overlay`}
          onClick={closeAll}
        ></div>

        <nav
          className={`main-nav ${menuOpen ? "open" : ""}`}
          aria-label="Menu principal"
        >
          <ul>
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.label}
                className={`nav-item ${openSubmenu === index ? "open" : ""}`}
              >
                {item.dropdown ? (
                  <>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(index);
                      }}
                    >
                      {item.label} <span className="caret"></span>
                    </a>
                    <div className="dropdown">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={closeAll}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} onClick={closeAll}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
