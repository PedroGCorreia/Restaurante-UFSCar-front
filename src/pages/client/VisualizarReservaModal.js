import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/VisualizarReservaModal.css';

function VisualizarReservasModal({ isOpen, onClose }) {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchReservations();
    }
  }, [isOpen]);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    // Obtém o username do LocalStorage, da mesma forma que no POST
    const username = localStorage.getItem('username') || '';
    try {
      const response = await fetch(
        `http://localhost:3000/reservations?client=${encodeURIComponent(username)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar reservas.');
      }
      const data = await response.json();
      setReservas(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content visualizar-reservas-modal">
        <h2>Minhas Reservas</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            {reservas.length === 0 ? (
              <p>Nenhuma reserva encontrada.</p>
            ) : (
              <ul className="reservas-list">
                {reservas.map((reserva) => (
                  <li key={reserva.id}>
                    <p><strong>Data:</strong> {reserva.date}</p>
                    <p><strong>Horário:</strong> {reserva.time}</p>
                    <p><strong>Quantidade:</strong> {reserva.quantity}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        <button className="cancel-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

VisualizarReservasModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VisualizarReservasModal;
