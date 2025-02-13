import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const location = useLocation();

  // Mapeamento de rotas para títulos
  const routeTitles = {
    '/pedidos': 'Pedidos',
    '/reservas': 'Reservas',
    '/reservas/historico': 'Histórico de Reservas',
    '/estoque': 'Estoque',
    '/funcionarios': 'Gestão de funcionários',
    '/relatorios-financeiros': 'Relatórios financeiros',
  };

  // Obtém o título com base na rota atual ou define um título padrão
  const title = routeTitles[location.pathname] || 'Página Inicial';

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
    </header>
  );
}

export default Header;
