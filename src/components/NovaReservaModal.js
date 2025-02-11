import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/NovaReservaModal.css';
import { FaTimes } from 'react-icons/fa';

function NovaReservaModal({ isOpen, onClose, onSubmit, existingReservas }) {
  const [cliente, setCliente] = useState('');
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [error, setError] = useState('');

  const limparFormulario = () => {
    setCliente('');
    setQuantidadePessoas(1);
    setData('');
    setHorario('');
    setError('');
  };

  useEffect(() => {
    if (!isOpen) {
      limparFormulario();
    }
  }, [isOpen]);


    const handleSubmit = async (e) => {
  
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:3000/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client: cliente,
            quantity: Number(quantidadePessoas),
            date: data,
            time: horario,
          }),
        });
    
    
        const reservaCriada = await response.json();
        onSubmit(reservaCriada);
  
  
        
        onClose();
        
        alert('Reserva criado com sucesso!');
        
        window.location.reload(); 
  
      } catch (error) {
        console.error('Erro ao adicionar reserva:', error);
        alert('Erro ao criar reserva.');
      }
    };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="nova-reserva-modal">
        <div className="modal-header">
          <h2 className="modal-title">Nova reserva</h2>
          <button className="close-button-reserva" onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cliente">Cliente:</label>
            <input
              type="text"
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantidadePessoas">Quantidade de pessoas:</label>
            <input
              type="number"
              id="quantidadePessoas"
              value={quantidadePessoas}
              onChange={(e) => setQuantidadePessoas(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data (DD/MM/AAAA):</label>
            <input
              type="text"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Ex: 25/12/2024"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="horario">Horário (HH:MM):</label>
            <input
              type="text"
              id="horario"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              placeholder="Ex: 19:30"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="finalizar-button">
            Finalizar reserva
          </button>
        </form>
      </div>
    </div>
  );
}

NovaReservaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  existingReservas: PropTypes.arrayOf(
    PropTypes.shape({
      cliente: PropTypes.string.isRequired,
      quantidadePessoas: PropTypes.number.isRequired,
      data: PropTypes.string.isRequired,
      horario: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NovaReservaModal;
