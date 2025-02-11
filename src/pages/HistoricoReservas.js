import React from 'react';

import CardHorizontal from '../components/CardHorizontal';

import '../styles/HistoricoReservas.css';

function HistoricoReservas() {
  
  const reservasHistorico = [
    {
      cliente: 'João Silva',
      quantidadePessoas: 4,
      data: '25/12/2023',
    },
    {
      cliente: 'Maria Oliveira',
      quantidadePessoas: 2,
      data: '31/12/2023',
    },
    {
      cliente: 'Pedro Santos',
      quantidadePessoas: 6,
      data: '15/01/2024',
    },
    {
      cliente: 'Ana Paula',
      quantidadePessoas: 3,
      data: '10/01/2024',
    },
    {
      cliente: 'Carlos Mendes',
      quantidadePessoas: 5,
      data: '05/01/2024',
    },
  ];

  return (
    <div className="historico-container">
      <div className="historico-card-list">
        {reservasHistorico.map((reserva, index) => (
          <CardHorizontal
            key={index}
            cliente={reserva.cliente}
            quantidadePessoas={reserva.quantidadePessoas}
            data={reserva.data}
          />
        ))}
      </div>
    </div>
  );
}

export default HistoricoReservas;