// src/components/pages/InterfaceCliente.js
import React, { useState } from 'react';
import { FaBookmark, FaEye, FaUtensils, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/InterfaceCliente.css';
import CardapioModal from './CardapioModal';
import ReservaModalCliente from './ReservaModalCliente';
import VisualizarReservasModal from './VisualizarReservaModal';

function InterfaceCliente({ onLogout, usuario }) {
  
  const [pedidoSolicitado, setPedidoSolicitado] = useState(false);
  const [isCardapioOpen, setIsCardapioOpen] = useState(false);
  const [isReservaModalOpen, setIsReservaModalOpen] = useState(false);
  const [isVisualizarReservasModalOpen, setIsVisualizarReservasModalOpen] = useState(false);

  const handleFazerPedido = () => {
    setPedidoSolicitado(true);
    setTimeout(() => setPedidoSolicitado(false), 5000);
  };

  return (
    <div className="cliente-container">
      <div className="cliente-card">
        <div className="logo-container">
          <div className="logo-ru">RU</div>
        </div>
        <h2 className="welcome-message">Bem-vindo ao Restaurante UFSCar</h2>
        <p className="service-message">Qual serviço você deseja acessar?</p>
        
        {/* Abre modal para fazer reserva */}
        <button className="cliente-button" onClick={() => setIsReservaModalOpen(true)}>
          <FaBookmark className="button-icon" />
          Fazer reserva de mesa
        </button>

        {/* Abre modal para visualizar reservas */}
        <button className="cliente-button" onClick={() => setIsVisualizarReservasModalOpen(true)}>
          <FaEye className="button-icon" />
          Visualizar reserva da mesa
        </button>

        <button className="cliente-button" onClick={() => setIsCardapioOpen(true)}>
          <FaUtensils className="button-icon" />
          Visualizar Cardápio
        </button>

        <button className="cliente-button" onClick={handleFazerPedido}>
          <FaShoppingBag className="button-icon" />
          Fazer Pedido
        </button>

        <button className="cliente-button logout-button" onClick={onLogout}>
          <FaSignOutAlt className="button-icon" />
          Sair
        </button>

        {pedidoSolicitado && (
          <div className="pedido-mensagem">
            O Garçom foi solicitado e irá até você!
          </div>
        )}
      </div>

      <CardapioModal isOpen={isCardapioOpen} onClose={() => setIsCardapioOpen(false)} />
      <ReservaModalCliente
        isOpen={isReservaModalOpen}
        onClose={() => setIsReservaModalOpen(false)}
        usuario={usuario}
      />
      <VisualizarReservasModal
        isOpen={isVisualizarReservasModalOpen}
        onClose={() => setIsVisualizarReservasModalOpen(false)}
      />
    </div>
  );
}

export default InterfaceCliente;
