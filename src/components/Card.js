import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaCheck } from 'react-icons/fa';
import '../styles/Card.css';

function Card({ width, height, title, onDetailsClick, onCompleteClick, isOpen }) {
  return (
    <div className="card" style={{ width: width, height: height }}>
      <h2 className="card-title">{title}</h2>
      {/* Conteúdo adicional do card pode ser inserido aqui */}
      <div className="card-buttons">
        <button
          className="card-button"
          onClick={onDetailsClick}
          aria-label="Detalhes"
        >
          <FaEye className="button-icon" />
          <span>Detalhes</span>
        </button>
        {isOpen && (
          <button
            className="card-button"
            onClick={onCompleteClick}
            aria-label="Concluído"
          >
            <FaCheck className="button-icon" />
            <span>Concluído</span>
          </button>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string.isRequired,
  onDetailsClick: PropTypes.func,
  onCompleteClick: PropTypes.func,
  isOpen: PropTypes.bool,
};

Card.defaultProps = {
  width: '300px',
  height: '200px',
  onDetailsClick: () => {},
  onCompleteClick: () => {},
  isOpen: true,
};

export default Card;