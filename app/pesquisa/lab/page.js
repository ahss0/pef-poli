import LabsGrid from "@/components/LabsGrid";

// Dados hardcoded (não vêm do Strapi) — laboratórios vinculados ao PEF.
const laboratorios = [
  {
    sigla: "LEM",
    nome: "Laboratório de Estruturas e Materiais Estruturais",
    departamento: "PEF",
    coordenacao:
      "professores Ruy Marcelo de Oliveira Pauletti / Leila C. Meneghetti Valverdes",
    telefone: "(11) 3091-5233 / 5519",
    emails: ["pauletti@usp.br", "lmeneghetti@usp.br"],
    site: "sites.usp.br/lem",
    siteUrl: "https://sites.usp.br/lem/",
    descricao: "O laboratório está instalado em dois ambientes para ensaios de materiais e elementos estruturais. Ele possui as divisões de dinâmica das estruturas, métodos ópticos e de ensaios e monitoração de estruturas, que dão apoio às linhas de pesquisa de sistemas estruturais de concreto, aço, madeira, alvenaria e novos materiais. O LEM possui uma laje de reação com capacidade de ensaios de até 10 MN, dois quadros metálicos de reação com capacidade de até 3.000 kN, três sistemas de ensaios mecânicos equipados para ensaios dinâmicos (DARTEC e WPM) e estáticos (LYNX-LEM). Os três equipamentos são providos de servossistemas, controlados por microcomputadores, que permitem a realização de ensaios com deformação ou tensão controlada. Um dos sistemas é constituído por uma plataforma móvel, que pode ser deslocada para ensaios de campo de vibrações forçadas. O sistema DARTEC também está equipado com acessórios para ensaios no âmbito da mecânica da fratura.",
    palavrasChave: [],
  },
  {
    sigla: "LMC",
    nome: "Laboratório de Mecânica Computacional",
    departamento: "PEF",
    coordenacao: "professores Eduardo de Morais Barreto Campello e Alfredo Gay Neto",
    telefone: "(11) 3091-5367",
    emails: ["campello@usp.br", "alfredo.gay@usp.br"],
    site: "lmc.poli.usp.br",
    siteUrl: "https://lmc.poli.usp.br/",
    descricao: "O LMC é um laboratório de pesquisa, ensino e extensão vinculado ao Departamento de Engenharia de Estruturas e Geotécnica (PEF) da Escola Politécnica da USP. Ele abriga projetos e atividades relacionadas ao desenvolvimento e uso de métodos numéricos que estão na fronteira do conhecimento das ciências mecânicas e, em particular, da mecânica dos sólidos e dos fluidos, incluindo estruturas, solos, interação solo-estrutura e interação fluido-estrutura. As atividades incluem o desenvolvimento de formulações avançadas do método dos elementos finitos, método das diferenças finitas, método dos elementos discretos, técnicas de integração no tempo, de discretização e geração de malhas, visualização gráfica, contato, problemas multifísicos, dentre outros. Também incluem a aplicação dessas técnicas para a simulação avançada de fenômenos físicos da mecânica com interesse prático para a engenharia. O LMC é um importante centro de recursos computacionais, compreendendo mais de 40 postos de trabalho com computadores desktop de última geração e três workstations com elevada capacidade de processamento para computação de alto desempenho. O laboratório dispõe de licenças de diversos compiladores e programas computacionais avançados para a análise de sólidos e estruturas, incluindo solos, fluidos e interação solo-estrutura e fluido-estrutura (tanto acadêmicos quanto comerciais). O laboratório trabalha com pesquisas e estudos para a utilização de programas computacionais avançados (acadêmicos e comerciais) de análise linear e não-linear, estática e dinâmica, de sólidos e estruturas, e sua interação com solos, fluidos e outros, com vistas à simulação de problemas das ciências mecânicas. Ele também possibilita o desenvolvimento de ferramentas relacionadas à visualização e computação gráfica aplicadas à mecânica computacional e, em particular, às engenharias de estruturas e geotécnica.",
    palavrasChave: [],
  },
  {
    sigla: "LMS",
    nome: "Laboratório de Mecânica dos Solos Milton Vargas",
    departamento: "PEF",
    coordenacao: "professores José Jorge Nader e José Orlando Avesani Neto",
    telefone: "(11) 3091-5498",
    emails: ["jjnader@usp.br", "avesani@usp.br"],
    site: "lms.poli.usp.br",
    siteUrl: "https://lms.poli.usp.br/",
    descricao: "O LMS realiza ensaios de caracterização, preparação de amostras, ensaios especiais, oficina mecânica, oficina eletrônica e ainda duas áreas externas para ensaios em maior escala. O campo experimental tem sido objeto de diversas pesquisas nas áreas de fundações, contenção e estabilidade de taludes. Dentre os equipamentos disponíveis, destacam-se: três sistemas de controle e aquisição de dados para câmaras triaxiais de trajetória de tensão (Bishop-Wesley), célula de adensamento de deformação controlada, prensas para ensaios de cisalhamento direto, ensaio de palheta de laboratório, prensas de cisalhamento direto com sistema de aquisição de dados, câmara triaxial para ensaios cíclicos com controle e aquisição de dados automáticos, sistema de ensaios de permeabilidade de parede flexível, sistemas para ensaios de difusão, dispersão (coluna) e adsorção (em lote), sistema para ensaios de permeabilidade ao ar, equipamentos para determinação da curva de retenção e sistema para ensaio de permeabilidade ao ar. Para estudos in-situ, o LMS possui os seguintes equipamentos: pressiômetro autoperfurante, tensiômetros, medidores de teor de umidade, temperatura e inclinômetro. O LMS possui uma longa história de contribuições para o desenvolvimento técnico-científico da Geotecnia Nacional. Em particular, pode-se destacar os estudos pioneiros em solos tropicais, que tiveram importância fundamental nos projetos e construções de barragens no Brasil.",
    palavrasChave: [],
  },
  {
    sigla: "LMO",
    nome: "Laboratório de Mecânica Offshore",
    departamento: "PME, PEF, PMR e PNV",
    coordenacao: "professor Celso Pesce",
    telefone: "(11) 3091-0648",
    emails: ["lmo@usp.br"],
    site: "lmo.poli.usp.br",
    siteUrl: "https://lmo.poli.usp.br/",
    descricao: "O Laboratório de Mecânica Offshore é um grupo de pesquisa multidepartamental, no qual atuam docentes de diversos departamentos e programas de pós-graduação da Poli. O Laboratório tem como objetivo fazer pesquisas teóricas e aplicadas em temas relativos à engenharia oceânica, abrangendo desde análises estruturais estáticas e projetos de sistemas de amarração de corpos flutuantes a problemas de interação fluido-estrutura e do comportamento estrutural de sistemas da engenharia offshore. O laboratório também desenvolve estudos com foco em controle passivo de vibrações e aproveitamento de energia a partir de vibrações induzidas pelo escoamento. O LMO possui diversos equipamentos disponíveis, incluindo máquinas para caracterização de propriedades mecânicas de materiais, uma impressora 3D, ferramentas diversas, um sistema óptico de monitoração de deslocamentos completo (para ser utilizado tanto em ar quanto em água) e uma mesa vibratória. Ele também dispõe de duas máquinas MTS para ensaios de tração e fadiga, uma sala para instrumentação com diversos sensores, uma máquina para ensaios de mangueiras pressurizadas, além de uma série de recursos computacionais. No último edital da Reitoria, ganhamos um túnel de vento de última geração, a ser instalado até o fim de 2026 (previsão). Atualmente, o LMO trabalha em projetos envolvendo análise dinâmica de estruturas utilizadas no transporte de óleo e gás do leito marinho para a superfície (projetos apoiados pela iniciativa privada e, um deles, em conjunto com um grupo da Escola de Engenharia de São Carlos). Existem também projetos apoiados pela indústria envolvendo comportamento mecânico de cabos de potência, além de um Projeto Temático FAPESP em dinâmica não linear de sistemas de engenharia. O laboratório já liderou ou participou de projetos de certificação e de dinâmica de estruturas de exploração de petróleo, outros que envolviam a análise de sistemas de amarração de navios e plataformas, de um projeto de análise da resposta de sensores geofísicos em operações de reboque, dentre outras iniciativas. O Centro de Dinâmica Não Linear Aplicada à Engenharia (NoDE) é um grupo de pesquisa criado em 2024, por ocasião do Projeto Temático FAPESP, que está abrigado no LMO, compartilhando equipamentos. Até o momento, aglutina-se trabalhos do Projeto Temático, bem como iniciativas em dinâmica não linear teórica e aplicada, com ênfase em controle de vibrações e aproveitamento de energia. Pretende-se que o NoDE desenvolva pesquisas apoiadas pela iniciativa privada em breve.",
    palavrasChave: [
      "mecânica offshore",
      "mecânica computacional",
      "interação fluido-estrutura",
      "dinâmica não-linear",
      "mecânica da fratura",
      "fadiga",
      "engenharia oceânica",
    ],
  },
];

export const metadata = {
  title: "Laboratórios | PEF-USP",
};

export default function LaboratoriosPage() {
  return (
    <main>
      <section className="container labs">
        <div className="labs-intro">
          <h1>Laboratórios</h1>
          <p>
            Conheça os laboratórios vinculados ao Departamento de Engenharia de
            Estruturas e Geotécnica (PEF).
          </p>
        </div>

        <LabsGrid laboratorios={laboratorios} />
      </section>
    </main>
  );
}
