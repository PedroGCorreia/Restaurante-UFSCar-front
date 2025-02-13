import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/ReservaModalCliente.css';

function ReservaModalCliente({ isOpen, onClose }) {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Recupera o username do LocalStorage
  const username = localStorage.getItem('username') || '';

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Dados da reserva utilizando o username do LocalStorage
    const reservaData = {
      client: username,
      date: data,
      time: horario,
      quantity: quantidade
    };

    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar a reserva.');
      }
      
      alert('Reserva realizada com sucesso!');
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Fazer Reserva</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={username} readOnly />
          </div>
          <div className="form-group">
            <label>Data da Reserva</label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Ex: 02/05/2025"
              required
            />
          </div>
          <div className="form-group">
            <label>Horário</label>
            <input
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              placeholder="Ex: 19:00"
              required
            />
          </div>
          <div className="form-group">
            <label>Quantidade de Pessoas</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              min="1"
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="confirm-button" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

ReservaModalCliente.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ReservaModalCliente;
