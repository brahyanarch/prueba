"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter para la redirección

interface LoginResponse {
  token: string;
  error?: string;
}

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inicializar el hook useRouter

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST", // Cambiado a POST para enviar los datos
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          password: password,
        }), // Aquí se envían el usuario y la contraseña
      });

      const data: LoginResponse = await response.json();
      console.log(data);

      if (response.ok) {
        // Si el inicio de sesión es exitoso, guarda el token en localStorage
        localStorage.setItem("token", data.token);
        console.log("Inicio de sesión exitoso");
        
        // Redirigir a otra página después del inicio de sesión exitoso
        router.push("/"); // Reemplaza '/dashboard' con la ruta que desees
      } else {
        // Manejar errores de respuesta
        setError(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.log("Error al conectarse con el servidor");
      setError("Error de conexión con el servidor");
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
