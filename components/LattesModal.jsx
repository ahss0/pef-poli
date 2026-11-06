"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function LattesModal({ professor, onClose }) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Trava scroll e ouvinte de tecla Escape (mantido da sua versão original)
  useEffect(() => {
    if (!professor) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [professor, onClose]);

  // Fetch dos dados acadêmicos via API
  const lattesId =
    professor?.lattesId ||
    professor?.lattes?.match(/\d{16}/)?.[0];

  useEffect(() => {
    if (!lattesId) return;

    let active = true;
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`/api/lattes/${lattesId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar dados da USP Aberta");
        return res.json();
      })
      .then((resData) => {
        if (active) setData(resData);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [lattesId]);

  if (!professor) return null;

  // Processamento dos dados obtidos para alimentar os gráficos
  const productions = data?.productions || [];

  // 1. Gráfico de Barras: Produções por Ano
  const prodByYear = productions.reduce((acc, item) => {
    if (item.year) acc[item.year] = (acc[item.year] || 0) + 1;
    return acc;
  }, {});

  const sortedYears = Object.keys(prodByYear).sort();
  const barChartData = {
    labels: sortedYears,
    datasets: [
      {
        label: "Produções por Ano",
        data: sortedYears.map((y) => prodByYear[y]),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 2. Gráfico de Rosca: Tipos de Publicação
  const prodByType = productions.reduce((acc, item) => {
    const typeLabel = item.type || "Outros";
    acc[typeLabel] = (acc[typeLabel] || 0) + 1;
    return acc;
  }, {});

  const doughnutChartData = {
    labels: Object.keys(prodByType),
    datasets: [
      {
        data: Object.values(prodByType),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const coauthors = data?.coauthors?.slice(0, 5) || [];

  return (
    <div
      className="lattes-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="lattes-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Currículo Lattes de ${professor.nome || professor.fullName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lattes-modal-header">
          <span>{professor.nome || data?.fullName} — Métricas Lattes</span>
          <button
            type="button"
            className="lattes-modal-close"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="lattes-modal-body">
          {loading && (
            <div className="lattes-status">Carregando dados acadêmicos...</div>
          )}

          {error && (
            <div className="lattes-status error">
              Não foi possível carregar os dados via API.
              {error}
            </div>
          )}

          {data && (
            <div className="lattes-dashboard">
              {/* Biografia / Resumo */}
              {data.biography && (
                <section className="lattes-section">
                  <h3>Resumo Acadêmico</h3>
                  <p className="biography-text">{data.biography}</p>
                </section>
              )}

              {/* Métricas Numéricas Rápidas */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <span className="metric-value">{productions.length}</span>
                  <span className="metric-label">Publicações Totais</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">{data.coauthors?.length || 0}</span>
                  <span className="metric-label">Coautores Registrados</span>
                </div>
              </div>

              {/* Visualização Visual (Gráficos) */}
              <div className="charts-grid">
                <div className="chart-box">
                  <h4>Evolução Anual</h4>
                  <div className="chart-wrapper">
                    <Bar
                      data={barChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="chart-box">
                  <h4>Distribuição por Tipo</h4>
                  <div className="chart-wrapper">
                    <Doughnut
                      data={doughnutChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom"
                          }
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Principais Coautores */}
              {coauthors.length > 0 && (
                <section className="lattes-section">
                  <h3>Principais Colaboradores</h3>
                  <ul className="coauthors-list">
                    {coauthors.map((ca, idx) => (
                      <li key={idx}>
                        <strong>{ca.name}</strong> ({ca.sharedWorksCount} trabalhos juntos)
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Lista das Produções Mais Recentes */}
              <section className="lattes-section">
                <h3>Últimas Produções</h3>
                <ul className="recent-productions">
                  {productions.slice(0, 5).map((prod, idx) => (
                    <li key={idx} className="prod-item">
                      <span className="prod-year">{prod.year}</span>
                      <div className="prod-info">
                        <strong>{prod.title}</strong>
                        {prod.publication && <p>{prod.publication}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
