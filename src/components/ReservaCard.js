import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaUsers, FaCalendarAlt, FaClock } from 'react-icons/fa';
import '../styles/ReservaCard.css';

function ReservaCard({ width, height, cliente, quantidadePessoas, data, horario }) {
  return (
    <div className="reserva-card" style={{ width: width, height: height }}>
      <div className="reserva-card-line">
        <FaUser className="reserva-icon" />
        <span><strong>Cliente:</strong> {cliente}</span>
      </div>
      <div className="reserva-card-line">
        <FaUsers className="reserva-icon" />
        <span><strong>Quantidade de pessoas:</strong> {quantidadePessoas}</span>
      </div>
      <div className="reserva-card-line">
        <FaCalendarAlt className="reserva-icon" />
        <span><strong>Data:</strong> {data}</span>
      </div>
      <div className="reserva-card-line">
        <FaClock className="reserva-icon" />
        <span><strong>Horário:</strong> {horario}</span>
      </div>
    </div>
  );
}

ReservaCard.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  cliente: PropTypes.string.isRequired,
  quantidadePessoas: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  horario: PropTypes.string.isRequired,
};

ReservaCard.defaultProps = {
  width: '300px',
  height: '200px',
};

export default ReservaCard;