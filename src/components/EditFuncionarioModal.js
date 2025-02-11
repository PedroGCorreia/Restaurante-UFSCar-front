// src/components/pages/EditFuncionarioModal.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/EditFuncionarioModal.css';
import { FaTimes } from 'react-icons/fa';

function EditFuncionarioModal({ isOpen, onClose, onSubmit, employee }) {
  // Estados para os campos do formulário (baseados no modelo Employee)
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [role, setRole] = useState('');
  const [contact, setContact] = useState('');
  const [salary, setSalary] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Atualiza os estados sempre que o employee for modificado ou o modal for aberto
  useEffect(() => {
    if (employee) {
      setName(employee.name || '');
      setCpf(employee.cpf || '');
      setBirthdate(employee.birthdate || '');
      setRole(employee.role || '');
      setContact(employee.contact || '');
      setSalary(employee.salary || '');
      setWeeklyHours(employee.weeklyHours || '');
      setStatus(employee.status || 'ativo');
    }
  }, [employee, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const updatedEmployee = {
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
      // Supondo que o backend utilize o id para identificar o funcionário
      const response = await fetch(`http://localhost:3000/employees/${employee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao atualizar funcionário');
        return;
      }

      const employeeData = await response.json();
      if (onSubmit) {
        onSubmit(employeeData);
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError('Erro na conexão com o servidor');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-funcionario-modal">
        <div className="modal-header">
          <h2 className="modal-title">{name || 'Editar Funcionário'}</h2>
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
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

EditFuncionarioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  employee: PropTypes.object,
};

export default EditFuncionarioModal;
