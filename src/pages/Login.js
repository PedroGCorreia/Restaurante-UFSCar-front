// src/components/pages/Login.js
import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    senha: '',
    confirmarSenha: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (isSignup) {
      // Validação simples para cadastro: as senhas devem coincidir
      if (formData.senha !== formData.confirmarSenha) {
        setErrorMessage('As senhas não conferem!');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // No cadastro, envia apenas username e senha; role será definido como "client"
          body: JSON.stringify({
            username: formData.username,
            password: formData.senha,
            role: 'client'
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Erro ao cadastrar usuário');
          return;
        }
        // Cadastro realizado com sucesso; exibe mensagem e retorna ao modo login
        setSuccessMessage('Cadastro realizado com sucesso! Por favor, faça login.');
        setIsSignup(false);
        setFormData({ username: '', senha: '', confirmarSenha: '' });
      } catch (err) {
        console.error(err);
        setErrorMessage('Erro na conexão com o servidor');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // O login utiliza apenas username e senha
          body: JSON.stringify({
            username: formData.username,
            password: formData.senha,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Login falhou!');
          return;
        }
        const data = await response.json();
        // Verifica o role retornado para direcionar o usuário
        if (data.user.role === 'admin') {
          localStorage.setItem('username', data.user.username); // Salva o username no LocalStorage
          onLogin({ loggedIn: true, role: 'admin' });
        } else {
          localStorage.setItem('username', data.user.username); // Salva o username no LocalStorage
          onLogin({ loggedIn: true, role: 'client' });
        }
      } catch (error) {
        console.error('Erro no login:', error);
        setErrorMessage('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Cadastro' : 'Login'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit" className="login-button">
          {isSignup ? 'Cadastrar' : 'Entrar'}
        </button>
        <div className="toggle-link">
          {isSignup ? (
            <span onClick={() => {
              setIsSignup(false);
              setErrorMessage('');
              setSuccessMessage('');
            }}>
              Já possui cadastro? Faça login.
            </span>
          ) : (
            <span onClick={() => {
              setIsSignup(true);
              setErrorMessage('');
              setSuccessMessage('');
            }}>
              Não possui cadastro? Cadastre-se.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
