import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/CardapioModal.css';

function CardapioModal({ isOpen, onClose }) {
  const pratos = [
    { nome: "Bife Acebolado", descricao: "Bife acebolado suculento servido com arroz branco, feijão temperado, batata frita e salada.", preco: "R$24,90" },
    { nome: "Frango Grelhado", descricao: "Filé de frango grelhado, temperado com ervas, servido com arroz, feijão, batata frita e salada.", preco: "R$22,90" },
    { nome: "Costelinha Suína", descricao: "Costelinha de porco assada lentamente, acompanhada de arroz, feijão tropeiro e vinagrete.", preco: "R$29,90" },
    { nome: "Peixe Frito", descricao: "Filé de tilápia empanado, servido com arroz, feijão, purê de batata e salada tropical.", preco: "R$27,90" },
    { nome: "Feijoada", descricao: "Feijão preto cozido com carne de porco, servido com arroz, couve refogada, farofa e laranja.", preco: "R$32,90" }
  ];

  const bebidas = [
    { nome: "Suco Natural (Laranja, Maracujá, Abacaxi, Manga)", descricao: "Refrescante e sem conservantes.", preco: "R$8,90" },
    { nome: "Refrigerante (Lata)", descricao: "Diversos sabores disponíveis.", preco: "R$6,90" },
    { nome: "Água Mineral (com ou sem gás)", descricao: "Pura e refrescante.", preco: "R$4,90" },
    { nome: "Chá Gelado (Limão ou Pêssego)", descricao: "Levemente adoçado, perfeito para os dias quentes.", preco: "R$7,90" }
  ];

  const sobremesas = [
    { nome: "Pudim de Leite", descricao: "Tradicional e cremoso, com calda de caramelo.", preco: "R$12,90" },
    { nome: "Brigadeirão", descricao: "Sobremesa de chocolate intensa e aveludada.", preco: "R$13,90" },
    { nome: "Banana Caramelizada com Canela", descricao: "Fatias de banana frita com açúcar e canela, servidas com chantilly.", preco: "R$10,90" }
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="cardapio-title">Cardápio</h2>

        <div className="cardapio-section">
          <h3>Pratos Feitos (PFs)</h3>
          {pratos.map((prato, index) => (
            <div key={index} className="cardapio-item">
              <div className="item-info">
                <strong>{prato.nome}</strong>
                <p>{prato.descricao}</p>
              </div>
              <div className="item-preco">{prato.preco}</div>
            </div>
          ))}
        </div>

        <div className="cardapio-section">
          <h3>Bebidas</h3>
          {bebidas.map((bebida, index) => (
            <div key={index} className="cardapio-item">
              <div className="item-info">
                <strong>{bebida.nome}</strong>
                <p>{bebida.descricao}</p>
              </div>
              <div className="item-preco">{bebida.preco}</div>
            </div>
          ))}
        </div>

        <div className="cardapio-section">
          <h3>Sobremesas</h3>
          {sobremesas.map((sobremesa, index) => (
            <div key={index} className="cardapio-item">
              <div className="item-info">
                <strong>{sobremesa.nome}</strong>
                <p>{sobremesa.descricao}</p>
              </div>
              <div className="item-preco">{sobremesa.preco}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

CardapioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CardapioModal;
