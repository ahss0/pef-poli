
const disciplinas = [
  { codigo: "PEF3522", nome: "Ação do Vento nas Edificações", ativacao: "01/01/2025" },
  { codigo: "PEF3517", nome: "Aleatoriedade e Incertezas: Modelagem e Impacto nas Decisões de Engenharia", ativacao: "01/01/2025" },
  { codigo: "PEF3542", nome: "Análise Limite em Mecânica das Estruturas", ativacao: "01/01/2025" },
  { codigo: "PEF3524", nome: "Concepção e Projeto de Obras Portuárias", ativacao: "01/01/2025" },
  { codigo: "PEF3501", nome: "Concepção, Projeto e Métodos Construtivos de Edifícios", ativacao: "01/01/2025" },
  { codigo: "PEF2502", nome: "Concepção, Projeto e Métodos Construtivos de Grandes Estruturas e Obras Enterradas", ativacao: "01/01/2003" },
  { codigo: "PEF3110", nome: "Concepção, Projeto e Realização das Estruturas: Aspectos Históricos", ativacao: "01/01/2025" },
  { codigo: "PEF3503", nome: "Diagnóstico, Recuperação e Reforço de Estruturas", ativacao: "01/01/2025" },
  { codigo: "PEF3527", nome: "Elasticidade Não-Linear", ativacao: "01/01/2025" },
  { codigo: "PEF0514", nome: "Elementos de Geomecânica", ativacao: "01/01/1996" },
  { codigo: "PEF3111", nome: "Empreendedorismo e Modelos de Negócios", ativacao: "01/01/2025" },
  { codigo: "PEF3405", nome: "Engenharia Geotécnica e de Fundações", ativacao: "01/01/2025" },
  { codigo: "PEF2509", nome: "Estágio Supervisionado em Engenharia de Estruturas I", ativacao: "01/01/2005" },
  { codigo: "PEF2510", nome: "Estágio Supervisionado em Engenharia de Estruturas II", ativacao: "01/01/2005" },
  { codigo: "PEF2511", nome: "Estágio Supervisionado em Engenharia de Solos I", ativacao: "01/01/2005" },
  { codigo: "PEF2512", nome: "Estágio Supervisionado em Engenharia de Solos II", ativacao: "01/01/2005" },
  { codigo: "PEF2503", nome: "Estruturas Danificadas: Segurança e Ações Corretivas", ativacao: "01/01/2003" },
  { codigo: "PEF3402", nome: "Estruturas de Aço", ativacao: "01/01/2025" },
  { codigo: "PEF3303", nome: "Estruturas de Concreto I", ativacao: "01/01/2025" },
  { codigo: "PEF3403", nome: "Estruturas de Concreto II", ativacao: "01/01/2025" },
  { codigo: "PEF3530", nome: "Estruturas de Madeiras: Projeto e Análise", ativacao: "15/07/2026" },
  { codigo: "PEF2602", nome: "Estruturas na Arquitetura II: Sistemas Reticulados", ativacao: "01/01/2006" },
  { codigo: "PEF2604", nome: "Estruturas na Arquitetura IV: Projeto", ativacao: "01/01/2006" },
  { codigo: "PEF2601", nome: "Estruturas na Arquitetura I: Fundamentos", ativacao: "01/01/2025" },
  { codigo: "PEF2603", nome: "Estruturas na Arquitetura III: Sistemas Reticulados e Laminares", ativacao: "01/01/2006" },
  { codigo: "PEF3502", nome: "Estruturas Subterrâneas", ativacao: "01/01/2025" },
  { codigo: "PEF3528", nome: "Ferramentas Computacionais na Mecânica das Estruturas: Criação e Concepção", ativacao: "01/01/2025" },
  { codigo: "PEF3208", nome: "Fundamentos de Mecânica das Estruturas", ativacao: "01/01/2015" },
  { codigo: "PEF2406", nome: "Fundamentos de Mecânica dos Solos", ativacao: "01/01/2002" },
  { codigo: "PEF3308", nome: "Fundamentos de Mecânica dos Solos", ativacao: "15/07/2025" },
  { codigo: "PEF3409", nome: "Geotecnia e Recuperação Ambiental", ativacao: "15/07/2024" },
  { codigo: "PEF3200", nome: "Introdução à Mecânica das Estruturas", ativacao: "01/01/2025" },
  { codigo: "PEF3202", nome: "Introdução à Mecânica dos Sólidos", ativacao: "01/01/2015" },
  { codigo: "PEF3302", nome: "Mecânica das Estruturas I", ativacao: "01/01/2025" },
  { codigo: "PEF3401", nome: "Mecânica das Estruturas II", ativacao: "01/01/2025" },
  { codigo: "PEF3112", nome: "Mecânica do Contínuo", ativacao: "01/01/2025" },
  { codigo: "PEF3312", nome: "Mecânica do Contínuo II", ativacao: "01/01/2025" },
  { codigo: "PEF3309", nome: "Mecânica dos Solos Ambiental", ativacao: "01/01/2016" },
  { codigo: "PEF3305", nome: "Mecânica dos Solos e das Rochas I", ativacao: "01/01/2025" },
  { codigo: "PEF3310", nome: "Mecânica dos Solos e das Rochas II", ativacao: "01/01/2025" },
  { codigo: "PEF0522", nome: "Mecânica dos Solos e Fundações", ativacao: "01/01/2012" },
  { codigo: "PEF2516", nome: "Modelagem, Simulação e Otimização Computacional na Engenharia Estrutural", ativacao: "15/07/2009" },
  { codigo: "PEF3516", nome: "Modelagem, Simulação e Otimização Computacional na Engenharia Estrutural", ativacao: "01/01/2025" },
  { codigo: "PEF3113", nome: "Modelos Elastoplásticos para Solos", ativacao: "01/01/2025" },
  { codigo: "PEF2515", nome: "O Método dos Elementos Finitos", ativacao: "15/07/2009" },
  { codigo: "PEF3515", nome: "O Método dos Elementos Finitos", ativacao: "01/01/2025" },
  { codigo: "PEF3304", nome: "Poluição do Solo", ativacao: "01/01/2025" },
  { codigo: "PEF2404", nome: "Pontes e Grandes Estruturas", ativacao: "01/01/2003" },
  { codigo: "PEF3404", nome: "Pontes e Grandes Estruturas", ativacao: "01/01/2025" },
  { codigo: "PEF3526", nome: "Projeto de Barragens e Diques", ativacao: "01/01/2025" },
  { codigo: "PEF2518", nome: "Projeto de Estruturas em Situação de Incêndio", ativacao: "15/07/2009" },
  { codigo: "PEF3518", nome: "Projeto de Estruturas em Situação de Incêndio", ativacao: "01/01/2025" },
  { codigo: "PEF3506", nome: "Projeto de Estruturas Marítimas", ativacao: "01/01/2025" },
  { codigo: "PEF3529", nome: "Projeto Estrutural Assistido por Computador", ativacao: "01/01/2025" },
  { codigo: "PEF3521", nome: "Projeto Paramétrico e Prototipagem Rápida de Estruturas", ativacao: "01/01/2025" },
  { codigo: "PEF2504", nome: "Racionalização do Projeto e Produção de Estruturas de Edifícios", ativacao: "01/01/2003" },
  { codigo: "PEF2407", nome: "Resistência dos Materiais", ativacao: "01/01/2002" },
  { codigo: "PEF3203", nome: "Resistência dos Materiais", ativacao: "01/01/2020" },
  { codigo: "PEF3207", nome: "Resistência dos Materiais", ativacao: "01/01/2015" },
  { codigo: "PEF3307", nome: "Resistência dos Materiais", ativacao: "01/01/2016" },
  { codigo: "PEF3201", nome: "Resistência dos Materiais e Estática das Construções I", ativacao: "01/01/2025" },
  { codigo: "PEF3301", nome: "Resistência dos Materiais e Estática das Construções II", ativacao: "01/01/2025" },
  { codigo: "PEF3523", nome: "Tópicos Avançados em Pontes", ativacao: "01/01/2025" },
  { codigo: "PEF3306", nome: "Tópicos de Mecânica dos Materiais", ativacao: "01/01/2016" },
  { codigo: "PEF3525", nome: "Tópicos Especiais em Estruturas de Concreto", ativacao: "01/01/2025" },
  { codigo: "PEF3508", nome: "Tópicos Especiais em Geotecnia Ambiental", ativacao: "01/01/2025" },
  { codigo: "PEF2507", nome: "Tópicos Especiais em Solos e Rochas", ativacao: "01/01/2003" },
  { codigo: "PEF3507", nome: "Tópicos Especiais em Solos e Rochas", ativacao: "01/01/2025" },
  { codigo: "PEF3511", nome: "Trabalho de Formatura em Projeto Estrutural e Geotécnico I", ativacao: "01/01/2018" },
  { codigo: "PEF3512", nome: "Trabalho de Formatura em Projeto Estrutural e Geotécnico II", ativacao: "01/01/2018" },
];

const janusUrl = (codigo) =>
  `https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=${codigo}`;

export const metadata = {
  title: "Graduação | PEF-USP",
};

export default function GraduacaoPage() {
  return (
    <main>
      <section className="container grad">
        <div className="grad-intro">
          <h1>Disciplinas de Graduação</h1>
          <p>
            Disciplinas de graduação oferecidas pelo Departamento de Engenharia
            de Estruturas e Geotécnica (PEF). Use o link do Jupiter para consultar
            as informações completas de cada uma.
          </p>
          <p className="grad-count">{disciplinas.length} disciplinas</p>
        </div>

        <ul className="grad-list">
          {disciplinas.map((d) => (
            <li key={d.codigo} className="grad-item">
              <span className="grad-codigo">{d.codigo}</span>
              <span className="grad-info">
                <span className="grad-nome">{d.nome}</span>
                <span className="grad-ativacao">Ativação: {d.ativacao}</span>
              </span>
              <a
                className="grad-janus"
                href={janusUrl(d.codigo)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${d.codigo} no Jupiter`}
              >
                Jupiter ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
