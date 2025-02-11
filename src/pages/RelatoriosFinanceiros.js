// src/components/pages/RelatoriosFinanceiros.js
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Pie, Line } from 'react-chartjs-2';
import '../styles/RelatoriosFinanceiros.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

// Registrando os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

function RelatoriosFinanceiros() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('Receita');
  const [movimentacoes, setMovimentacoes] = useState([]);

  const handleAdicionar = () => {
    if (valor === '' || isNaN(valor)) return;

    const novaMovimentacao = {
      valor: parseFloat(valor),
      tipo,
      data: new Date(),
    };

    setMovimentacoes([...movimentacoes, novaMovimentacao]);
    setValor('');
    setTipo('Receita');
  };

  // Calculando receita e despesa totais
  const totalReceita = movimentacoes
    .filter((m) => m.tipo === 'Receita')
    .reduce((acc, m) => acc + m.valor, 0);

  const totalDespesa = movimentacoes
    .filter((m) => m.tipo === 'Despesa')
    .reduce((acc, m) => acc + m.valor, 0);

  const balancoTotal = totalReceita - totalDespesa;

  // Preparando dados para o gráfico de pizza
  const pieData = {
    labels: ['Receita', 'Despesa'],
    datasets: [
      {
        label: 'Movimentações',
        data: [totalReceita, totalDespesa],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Verde para Receita
          'rgba(255, 99, 132, 0.6)', // Vermelho para Despesa
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Preparando dados para o gráfico de linhas
  const lineData = {
    labels: movimentacoes.map((m) => m.data.toLocaleDateString()),
    datasets: [
      {
        label: 'Receita',
        data: movimentacoes.map((m) => (m.tipo === 'Receita' ? m.valor : null)),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 1)', // Verde
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Despesa',
        data: movimentacoes.map((m) => (m.tipo === 'Despesa' ? m.valor : null)),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 1)', // Vermelho
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="relatorios-container">
      <h2 className="relatorios-title">Registro de movimentação</h2>
      
      <div className="form-container">
        <div className="form-left">
          <input
            type="number"
            placeholder="Valor em R$"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="input-valor"
          />
          
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                value="Receita"
                checked={tipo === 'Receita'}
                onChange={() => setTipo('Receita')}
              />
              Receita
            </label>
            <label>
              <input
                type="radio"
                value="Despesa"
                checked={tipo === 'Despesa'}
                onChange={() => setTipo('Despesa')}
              />
              Despesa
            </label>
          </div>
        </div>
        
        <div className="form-right">
          <button className="adicionar-button" onClick={handleAdicionar}>
            <FaPlus className="button-icon" />
            Adicionar movimentação
          </button>
        </div>
      </div>
      
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="grafico-pizza">
            <h3>Receita vs Despesa</h3>
            <Pie data={pieData} />
          </div>
          <div className="grafico-linhas">
            <h3>Movimentações ao Longo do Tempo</h3>
            <Line data={lineData} />
          </div>
        </div>
        
        <div className="balanco-total">
          <span className="balanco-text">Balanço total:</span>
          <span className={`balanco-valor ${balancoTotal < 0 ? 'negativo' : 'positivo'}`}>
            R$ {balancoTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RelatoriosFinanceiros;
