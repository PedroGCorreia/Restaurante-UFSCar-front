// src/components/pages/EstoqueModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import '../styles/EstoqueModal.css';

function EstoqueModal({ isOpen, onClose, onSubmit }) {
  const [items, setItems] = useState([{ produto: '', quantidade: '' }]);

  if (!isOpen) {
    return null;
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { produto: '', quantidade: '' }]);
  };

  const resetForm = () => {
    setItems([{ produto: '', quantidade: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Para cada item, envia um POST para adicionar o produto ao estoque.
      const responses = await Promise.all(
        items.map(item =>
          fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Considerando que o modelo Product utiliza "productName" e "quantity" (como string)
            body: JSON.stringify({
              productName: item.produto,
              quantity: item.quantidade.toString()
            })
          }).then(res => {
            if (!res.ok) {
              throw new Error('Erro ao adicionar produto');
            }
            return res.json();
          })
        )
      );
      // Chama o callback para atualizar a lista de produtos (se necessário)
      if (onSubmit) {
        onSubmit(responses);
      }
      resetForm();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar ao estoque</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {items.map((itemObj, index) => (
            <div key={index} className="item-group">
              <input
                type="text"
                placeholder="Produto"
                value={itemObj.produto}
                onChange={(e) => handleItemChange(index, 'produto', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={itemObj.quantidade}
                onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" className="add-item-button" onClick={handleAddItem}>
            <FaPlus /> <span>Adicionar</span>
          </button>
          <button type="submit" className="concluir-button">
            Adicionar ao estoque
          </button>
          <button type="button" className="close-button-EM" onClick={onClose}>
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
}

EstoqueModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EstoqueModal;
