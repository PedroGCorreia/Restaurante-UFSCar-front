import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import NovoFuncionarioModal from '../components/NovoFuncionarioModal';
import EditFuncionarioModal from '../components/EditFuncionarioModal';
import '../styles/Funcionarios.css';

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchFuncionarios = () => {
    fetch('http://localhost:3000/employees')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar funcionários');
        }
        return response.json();
      })
      .then((data) => {
        setFuncionarios(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const handleNovoSubmit = (newEmployee) => {
    setFuncionarios([...funcionarios, newEmployee]);
  };

  const handleEditSubmit = (updatedEmployee) => {
    const updatedList = funcionarios.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setFuncionarios(updatedList);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  return (
    <div className="funcionarios-container">
      <div className="funcionarios-buttons">
        <button
          className="funcionarios-button cadastrar-button"
          onClick={() => setIsNovoModalOpen(true)}
        >
          <FaPlus className="button-icon" />
          Cadastrar funcionário
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="funcionarios-content">
          <table className="funcionarios-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Contato</th>
                <th>Horas Semanais</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((funcionario, index) => (
                <tr key={index}>
                  <td>{funcionario.name}</td>
                  <td>{funcionario.role}</td>
                  <td>{funcionario.contact}</td>
                  <td>{funcionario.weeklyHours}</td>
                  <td>{funcionario.status}</td>
                  <td className="acoes-cell">
                    <FaEdit
                      className="edit-icon"
                      aria-label={`Editar ${funcionario.name}`}
                      onClick={() => openEditModal(funcionario)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NovoFuncionarioModal
        isOpen={isNovoModalOpen}
        onClose={() => setIsNovoModalOpen(false)}
        onSubmit={handleNovoSubmit}
      />

      <EditFuncionarioModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        employee={selectedEmployee}
      />
    </div>
  );
}

export default Funcionarios;
