// components/Footer.jsx
// Componente estático — sem interatividade, então pode ficar
// como Server Component (sem "use client").
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Institucional</h4>
            <ul>
              <li><a href="/quem-somos">Quem somos</a></li>
              <li><a href="#">Ensino</a></li>
              <li><a href="/pesquisa">Pesquisa</a></li>
              <li><a href="/extensao">Extensão</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li><a href="#">Av. Prof. Almeida Prado, Travessa 2, Nº 83</a></li>
              <li><a href="#">Cidade Universitária, São Paulo-SP</a></li>
              <li><a href="#">Tel: +55 (11) 3091-5234</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Departamento de Engenharia de
            estruturas e Geotécnica — USP
          </span>
          <div className="footer-brasao">
            <img src="/img/brasao.png" alt="Brasão da USP" />
          </div>
        </div>
      </div>
    </footer>
  );
}
