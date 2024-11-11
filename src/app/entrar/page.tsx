"use client"
import React, { useState } from 'react';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos
    console.log()
    try {
      const response = await fetch('http://localhost:3000/api/roles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        } // Enviar el usuario y la contraseña
      }); 

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Si el inicio de sesión es exitoso, guarda el token en localStorage
        localStorage.setItem('token', data.token);
        console.log('Inicio de sesión exitoso');
      } else {
        // Manejar errores de respuesta
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.log('Error al conectarse con el servidor');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
