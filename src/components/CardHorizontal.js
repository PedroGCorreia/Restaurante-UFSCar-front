import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CardHorizontal.css';
import { FaUser, FaUsers, FaCalendarAlt } from 'react-icons/fa';

function CardHorizontal({ cliente, quantidadePessoas, data }) {
  return (
    <div className="card-horizontal">
      <div className="card-horizontal-item">
        <FaUser className="icon-card-horizontal" aria-hidden="true" />
        <span className="info-text">{cliente}</span>
      </div>
      <div className="card-horizontal-item">
        <FaUsers className="icon-card-horizontal" aria-hidden="true" />
        <span className="info-text">{quantidadePessoas} pessoa(s)</span>
      </div>
      <div className="card-horizontal-item">
        <FaCalendarAlt className="icon-card-horizontal" aria-hidden="true" />
        <span className="info-text">{data}</span>
      </div>
    </div>
  );
}

CardHorizontal.propTypes = {
  cliente: PropTypes.string.isRequired,
  quantidadePessoas: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
};

export default CardHorizontal;