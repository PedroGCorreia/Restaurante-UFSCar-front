import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import '../styles/DetalhesModal.css';

function DetalhesModal({ isOpen, onClose, pedido }) {

  if (!isOpen || !pedido) {
    return null;
  }

  return (
    <div className="detalhes-modal-overlay">
      <div className="detalhes-modal-content">
        <button className="detalhes-modal-close" onClick={onClose} aria-label="Fechar">
          <FaTimes />
        </button>
        <h2>{pedido.titulo}</h2>
        <p><strong>Mesa:</strong> {pedido.table}</p>
        <div className="detalhes-modal-itens">
          <h3>Itens:</h3>
          <ul>
            {pedido.items.map((item, index) => (
              <li key={index}>
                {item.item} - Quantidade: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

DetalhesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pedido: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    mesa: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.string.isRequired,
        quantidade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      })
    ).isRequired,
  }),
};

export default DetalhesModal;