// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

import Pedidos from './pages/Pedidos'; 
import Reservas from './pages/Reservas';
import HistoricoReservas from './pages/HistoricoReservas';
import Estoque from './pages/Estoque';
import Funcionarios from './pages/Funcionarios';
import RelatoriosFinanceiros from './pages/RelatoriosFinanceiros';
import Login from './pages/Login';
import InterfaceCliente from './pages/client/InterfaceCliente';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [auth, setAuth] = useState({ loggedIn: false, role: null });

  const handleLogin = (userData) => {
    setAuth({ loggedIn: true, role: userData.role });
    console.log('Usuário logado:', userData.role);
  };

  const handleLogout = () => {
    setAuth({ loggedIn: false, role: null });
  };

  return (
    <Router>
      {auth.loggedIn ? (
        auth.role === 'admin' ? (
          <div className="app-container">
            <Sidebar onLogout={handleLogout} isLoggedIn={auth.loggedIn} />
            <Header />
            <div className="main-content">
              <Routes>
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/reservas" element={<Reservas />} />
                <Route path="/reservas/historico" element={<HistoricoReservas />} />
                <Route path="/estoque" element={<Estoque />} />
                <Route path="/funcionarios" element={<Funcionarios />} />
                <Route path="/relatorios-financeiros" element={<RelatoriosFinanceiros />} />
                <Route path="/" element={<Navigate to="/pedidos" />} />
                <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
              </Routes>
            </div>
          </div>
        ) : (
          <InterfaceCliente onLogout={handleLogout} />
        )
      ) : (
        <Routes>
          <Route path="/*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
