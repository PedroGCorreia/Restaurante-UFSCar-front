// src/components/pages/RegistrarConsumoModal.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import '../styles/RegistrarConsumoModal.css';

function RegistrarConsumoModal({ isOpen, onClose, products, onSubmit }) {
  // Inicializa um estado para controle do consumo para cada produto.
  // Para cada produto, armazenamos: selected (checkbox), consumo (quantidade informada) e, opcionalmente, um erro.
  const [consumptionData, setConsumptionData] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const initialData = products.map(product => ({
        id: product.id,
        productName: product.productName,
        available: Number(product.quantity),
        selected: false,
        consumo: '',
        error: ''
      }));
      setConsumptionData(initialData);
    }
  }, [products, isOpen]);

  const handleCheckboxChange = (index, checked) => {
    const newData = [...consumptionData];
    newData[index].selected = checked;
    if (!checked) {
      newData[index].consumo = '';
      newData[index].error = '';
    }
    setConsumptionData(newData);
  };

  const handleConsumptionChange = (index, value) => {
    const newData = [...consumptionData];
    newData[index].consumo = value;
    if (Number(value) > newData[index].available) {
      newData[index].error = `Máximo permitido: ${newData[index].available}`;
    } else {
      newData[index].error = '';
    }
    setConsumptionData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validação: para cada produto selecionado, consumo deve ser menor ou igual ao disponível e maior que zero.
    for (let item of consumptionData) {
      if (item.selected) {
        if (Number(item.consumo) > item.available) {
          alert(`Quantidade máxima permitida para ${item.productName} é ${item.available}`);
          return;
        }
        if (!item.consumo || Number(item.consumo) <= 0) {
          alert(`Informe uma quantidade válida para ${item.productName}`);
          return;
        }
      }
    }

    // Para cada produto selecionado, realize a atualização via PUT.
    const updatePromises = consumptionData
      .filter(item => item.selected)
      .map(item => {
        const newQuantity = item.available - Number(item.consumo);
        return fetch(`http://localhost:3000/products/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity.toString() })
        }).then(response => {
          if (!response.ok) {
            throw new Error(`Erro ao atualizar ${item.productName}`);
          }
          return response.json();
        });
      });

    try {
      await Promise.all(updatePromises);
      if (onSubmit) {
        onSubmit();
      }
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content registrar-consumo-modal">
        <div className="modal-header">
          <h2 className="modal-title">Registrar Consumo</h2>
          <button className="close-button" onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="consumption-list">
            {consumptionData.map((item, index) => (
              <div key={item.id} className="consumption-item">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
                <span className="product-name">{item.productName}</span>
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={item.consumo}
                  onChange={(e) => handleConsumptionChange(index, e.target.value)}
                  disabled={!item.selected}
                />
                {item.error && <span className="error-text">{item.error}</span>}
              </div>
            ))}
          </div>
          <button type="submit" className="concluir-button">
            Concluir registro
          </button>
        </form>
      </div>
    </div>
  );
}

RegistrarConsumoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
};

export default RegistrarConsumoModal;
