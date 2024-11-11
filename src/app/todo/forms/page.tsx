// app/forms/new/page.tsx (o similar si estás usando la carpeta app)
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar desde 'next/navigation'
import Link from 'next/link';

export default function NewForm() {
  const [formName, setFormName] = useState('');
  const router = useRouter(); // Usar el router de 'next/navigation'

  const handleCreateForm = async () => {
    if (!formName) return;

    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: formName }),
    });

    if (response.ok) {
      const newForm = await response.json();
      router.push(`/todo/forms/${newForm.id}/edit`); // Redirigir a la página de edición de preguntas
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Crear Nuevo Formulario</h1>
      <input
        type="text"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        placeholder="Nombre del formulario"
        className="border p-2 mt-4 w-full"
      />
      <button
        onClick={handleCreateForm}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Crear Formulario
      </button>
    </div>
  );
}
