import React, { useState, useEffect } from 'react';
import { FaUtensils, FaHistory, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import ReservaCard from '../components/ReservaCard';
import NovaReservaModal from '../components/NovaReservaModal';

import '../styles/Reservas.css';

function Reservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:3000/reservations', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Erro ao carregar reservas');
        }
        console.log("response.json()", response.data)

        const dadosReservas = await response.json();

        const reservasOrdenadas = dadosReservas
          .map(reserva => ({
            ...reserva,
            dataObj: parseDate(reserva.date),
          }))
          .sort((a, b) => a.dataObj - b.dataObj)
          .map(({ dataObj, ...rest }) => rest);

          console.log("reservas", reservasOrdenadas)
        setReservas(reservasOrdenadas);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  const parseDate = (dataStr) => {
    const [ano, mes, dia] = dataStr.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  };

  const handleHistorico = () => {
    navigate('/reservas/historico');
  };

  const handleNovaReserva = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFinalizarReserva = async (novaReserva) => {
    setReservas([...reservas, novaReserva]);
  };

  return (
    <div className="reservas-container">
      <div className="reservas-header">
        <h2 className="reservas-title">
          <FaUtensils className="reservas-icon" aria-hidden="true" />
          Reservas em aberto
        </h2>
        <div className="reservas-buttons">
          <button className="historico-button" onClick={handleHistorico}>
            <FaHistory className="button-icon" aria-hidden="true" />
            Histórico de reservas
          </button>
          <button className="nova-reserva-button-header" onClick={handleNovaReserva}>
            <FaPlus className="button-icon" aria-hidden="true" />
            Nova Reserva
          </button>
        </div>
      </div>
      <div className="reservas-card-container">
        {reservas.map((reserva, index) => (
          <ReservaCard
            key={index}
            width="300px"
            height="180px"
            cliente={reserva.client}
            quantidadePessoas={reserva.quantity}
            data={reserva.date}
            horario={reserva.time}
          />
        ))}
      </div>

      <NovaReservaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFinalizarReserva}
        existingReservas={reservas}
      />
    </div>
  );
}

export default Reservas;
