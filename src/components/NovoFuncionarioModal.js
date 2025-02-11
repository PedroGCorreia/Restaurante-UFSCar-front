// src/components/pages/NovoFuncionarioModal.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/NovoFuncionarioModal.css';
import { FaTimes } from 'react-icons/fa';

function NovoFuncionarioModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [role, setRole] = useState('');
  const [contact, setContact] = useState('');
  const [salary, setSalary] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [status, setStatus] = useState('ativo');
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setCpf('');
    setBirthdate('');
    setRole('');
    setContact('');
    setSalary('');
    setWeeklyHours('');
    setStatus('ativo');
    setError('');
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria o objeto com os dados do funcionário, agora incluindo "name"
    const newEmployee = {
      name,
      cpf,
      birthdate,
      role,
      contact,
      salary,
      weeklyHours,
      status,
    };

    try {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao cadastrar funcionário');
        return;
      }

      const employeeData = await response.json();
      if (onSubmit) {
        onSubmit(employeeData);
      }
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Erro na conexão com o servidor');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content novo-funcionario-modal">
        <div className="modal-header">
          <h2 className="modal-title">Cadastrar Novo Funcionário</h2>
          <button className="close-button" onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Data de Nascimento:</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Cargo:</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contato:</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salário:</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weeklyHours">Horas Semanais:</label>
            <input
              type="number"
              id="weeklyHours"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Situação:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="ativo">Ativo</option>
              <option value="em férias">Em Férias</option>
              <option value="atestado">Atestado</option>
            </select>
          </div>
          <button type="submit" className="concluir-button">
            Concluir Cadastro
          </button>
        </form>
      </div>
    </div>
  );
}

NovoFuncionarioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default NovoFuncionarioModal;
