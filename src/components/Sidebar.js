import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FaShoppingBag, FaBookmark, FaBox, FaUsers, FaDollarSign, FaSignOutAlt } from 'react-icons/fa';

function Sidebar({ onLogout, isLoggedIn }) {
  return (
    <div className="sidebar">
      <div className="sidebar-buttons">
        <NavLink
          to="/pedidos"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaShoppingBag className="icon" aria-hidden="true" />
          <span>Pedidos</span>
        </NavLink>
        <NavLink
          to="/reservas"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaBookmark className="icon" aria-hidden="true" />
          <span>Reservas</span>
        </NavLink>
        <NavLink
          to="/estoque"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaBox className="icon" aria-hidden="true" />
          <span>Estoque</span>
        </NavLink>
        <NavLink
          to="/funcionarios"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaUsers className="icon" aria-hidden="true" />
          <span>Funcionários</span>
        </NavLink>
        <NavLink
          to="/relatorios-financeiros"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaDollarSign className="icon" aria-hidden="true" />
          <span>Relatórios</span>
        </NavLink>
      </div>
      {isLoggedIn && (
        <span 
          className="logout-icon-wrapper" 
          onClick={onLogout} 
          aria-label="Logout" 
          title="Logout"
        >
          <FaSignOutAlt className="logout-icon" />
        </span>
      )}
    </div>
  );
}

export default Sidebar;
