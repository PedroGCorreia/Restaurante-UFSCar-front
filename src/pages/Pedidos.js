import React, { useState, useEffect } from 'react';
import { FaPlus, FaBoxOpen, FaCheckCircle } from 'react-icons/fa';

import Card from '../components/Card';
import NovoPedidoModal from '../components/NovoPedidoModal';
import DetalhesModal from '../components/DetalhesModal';

import '../styles/Pedidos.css';

function Pedidos() {
  const [isNovoPedidoModalOpen, setIsNovoPedidoModalOpen] = useState(false);
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [pedidosAbertos, setPedidosAbertos] = useState([]);
  const [pedidosConcluidos, setPedidosConcluidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/orders')
      .then(response => response.json())
      .then(data => {
        const abertos = data.filter(pedido => !pedido.isCompleted);
        const concluidos = data.filter(pedido => pedido.isCompleted);
        setPedidosAbertos(abertos);
        setPedidosConcluidos(concluidos);
      })
      .catch(error => console.error('Erro ao buscar pedidos:', error));
  }, []);

  const handleDetails = (pedidoId) => {
    const pedido = [...pedidosAbertos, ...pedidosConcluidos].find(p => p.id === pedidoId);
    if (pedido) {
      setPedidoSelecionado(pedido);
      setIsDetalhesModalOpen(true);
    }
  };

  const handleComplete = async (pedidoId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${pedidoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar pedido');

      setPedidosAbertos(prev => prev.filter(p => p.id !== pedidoId));
      setPedidosConcluidos(prev => [
        ...prev,
        { ...pedidosAbertos.find(p => p.id === pedidoId), isCompleted: true },
      ]);

      alert(`Pedido ${pedidoId} Concluído!`);
    } catch (error) {
      console.error('Erro ao concluir pedido:', error);
    }
  };

  const handleNewPedido = () => setIsNovoPedidoModalOpen(true);
  const handleCloseNovoPedidoModal = () => setIsNovoPedidoModalOpen(false);

  const handleSubmitPedido = (newPedido) => {
    setPedidosAbertos((prev) => [...prev, newPedido]);
  };
  

  const handleCloseDetalhesModal = () => {
    setIsDetalhesModalOpen(false);
    setPedidoSelecionado(null);
  };

  return (
    <div className="pedidos-container">
      <section className="pedidos-section">
        <h2 className="section-title">
          <FaBoxOpen className="section-icon" />
          Pedidos Abertos
        </h2>
        <div className="card-container">
          {pedidosAbertos.map((pedido) => (
            <Card
              key={pedido.id}
              width="300px"
              height="200px"
              title={`Pedido #${pedido.id}`}
              onDetailsClick={() => handleDetails(pedido.id)}
              onCompleteClick={() => handleComplete(pedido.id)}
              isOpen={!pedido.isCompleted}
            />
          ))}
        </div>
      </section>

      <section className="pedidos-section">
        <h2 className="section-title">
          <FaCheckCircle className="section-icon" />
          Pedidos Concluídos
        </h2>
        <div className="card-container">
          {pedidosConcluidos.map((pedido) => (
            <Card
              key={pedido.id}
              width="300px"
              height="200px"
              title={`Pedido #${pedido.id}`}
              onDetailsClick={() => handleDetails(pedido.id)}
              isOpen={!pedido.isCompleted}
            />
          ))}
        </div>
      </section>

      <button className="novo-pedido-button" onClick={handleNewPedido}>
        <FaPlus className="novo-pedido-icon" />
        <span>Novo Pedido</span>
      </button>

      <NovoPedidoModal
        isOpen={isNovoPedidoModalOpen}
        onClose={handleCloseNovoPedidoModal}
        onSubmit={handleSubmitPedido}
      />

      <DetalhesModal
        isOpen={isDetalhesModalOpen}
        onClose={handleCloseDetalhesModal}
        pedido={pedidoSelecionado}
      />
    </div>
  );
}

export default Pedidos;
