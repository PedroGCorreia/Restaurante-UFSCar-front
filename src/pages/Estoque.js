import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import EstoqueModal from '../components/EstoqueModal';
import RegistrarConsumoModal from '../components/RegistrarConsumoModal';
import '../styles/Estoque.css';

function Estoque() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConsumoModalOpen, setIsConsumoModalOpen] = useState(false);

  const fetchProducts = () => {
    fetch('http://localhost:3000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddSubmit = (newProducts) => {
    fetchProducts();
  };

  const handleConsumoSubmit = () => {
    fetchProducts();
  };

  return (
    <div className="estoque-container">
      <div className="estoque-buttons">
        <button className="estoque-button add-button" onClick={() => setIsAddModalOpen(true)}>
          <FaPlus className="button-icon" />
          Adicionar ao estoque
        </button>
        <button className="estoque-button register-button" onClick={() => setIsConsumoModalOpen(true)}>
          <FaTrashAlt className="button-icon" />
          Registrar Consumo
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="estoque-content">
          <table className="estoque-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EstoqueModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />

      <RegistrarConsumoModal
        isOpen={isConsumoModalOpen}
        onClose={() => setIsConsumoModalOpen(false)}
        products={products}
        onSubmit={handleConsumoSubmit}
      />
    </div>
  );
}

export default Estoque;
