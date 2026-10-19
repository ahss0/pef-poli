
const disciplinas = [
  { codigo: "PEF5705", nome: "Dimensionamento de Estruturas em Situação de Incêndio" },
  { codigo: "PEF5711", nome: "Fundamentos da Mecânica Computacional" },
  { codigo: "PEF5731", nome: "Fratura e Fadiga Aplicadas à Engenharia de Estruturas" },
  { codigo: "PEF5734", nome: "Fundamentos das Estruturas de Aço" },
  { codigo: "PEF5737", nome: "Dinâmica não Linear e Estabilidade" },
  { codigo: "PEF5738", nome: "Ações e Segurança das Estruturas" },
  { codigo: "PEF5743", nome: "Computação Gráfica para Modelagem em Engenharia de Estruturas" },
  { codigo: "PEF5749", nome: "Modelagem Computacional de Estruturas de Concreto" },
  { codigo: "PEF5750", nome: "Estruturas Leves" },
  { codigo: "PEF5762", nome: "Método dos Elementos Finitos" },
  { codigo: "PEF5799", nome: "Infraestrutura Ferroviária: Modelação e Monitorização" },
  { codigo: "PEF5802", nome: "Mecânica dos Solos Experimental" },
  { codigo: "PEF5803", nome: "Resistência e Deformalidade dos Solos" },
  { codigo: "PEF5805", nome: "Permeabilidade e Adensamento" },
  { codigo: "PEF5821", nome: "Estacas Verticais Submetidas a Esforços Axiais" },
  { codigo: "PEF5827", nome: "Estabilidade e Estabilização de Taludes Aplicados em Obras de Infraestrutura" },
  { codigo: "PEF5829", nome: "Ensaios In Situ e Instrumentação em Obras" },
  { codigo: "PEF5873", nome: "Solos Reforçados para Obras de Infraestrutura: Conceitos e Aplicações" },
  { codigo: "PEF5874", nome: "Conceitos e Aplicações de Mecânica dos Solos Não Saturados em Obras de Infraestrutura Geotécnica" },
  { codigo: "PEF5875", nome: "Barragens" },
  { codigo: "PEF5876", nome: "Geotecnia dos Solos Marinhos da Baixada Santista" },
  { codigo: "PEF5916", nome: "Dinâmica e Estabilidade das Estruturas" },
  { codigo: "PEF5917", nome: "Elementos de Mecânica dos Sólidos Deformáveis" },
  { codigo: "PEF5918", nome: "Fundamentos da Mecânica dos Sólidos Deformáveis e das Estruturas" },
  { codigo: "PEF5920", nome: "Fundamentos do Concreto Estrutural" },
  { codigo: "PEF6000", nome: "Tópicos Especiais em Dinâmica de Estruturas" },
  { codigo: "PEF6001", nome: "Mecânica Computacional Aplicada a Estruturas Reticuladas" },
  { codigo: "PEF6002", nome: "Tópicos Avançados em Mecânica Computacional: Otimização, Plasticidade, Contato e Dinâmica de Sistemas de Corpos Flexíveis" },
  { codigo: "PEF6003", nome: "Chapas, Placas e Cascas" },
  { codigo: "PEF6004", nome: "Estabilidade e Bifurcações" },
];

const janusUrl = (codigo) =>
  `https://uspdigital.usp.br/janus/componente/catalogoDisciplinasInicial.jsf?action=3&sgldis=${codigo}`;

export const metadata = {
  title: "Pós-Graduação | PEF-USP",
};

export default function PosGraduacaoPage() {
  return (
    <main>
      <section className="container pos">
        <div className="pos-intro">
          <h1>Disciplinas de Pós-Graduação</h1>
          <p>
            Disciplinas oferecidas pelo Departamento de Engenharia de Estruturas
            e Geotécnica (PEF). Use o link do Janus para consultar as
            informações completas de cada uma.
          </p>
          <p className="pos-count">{disciplinas.length} disciplinas</p>
        </div>

        <ul className="pos-list">
          {disciplinas.map((d) => (
            <li key={d.codigo} className="pos-item">
              <span className="pos-codigo">{d.codigo}</span>
              <span className="pos-nome">{d.nome}</span>
              <a
                className="pos-janus"
                href={janusUrl(d.codigo)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${d.codigo} no Janus`}
              >
                Janus ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
