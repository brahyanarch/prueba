import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [dni, setDni] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3009/api/cliente/${dni}`)
    const data = await response.json()
    if (data.exists) {
      router.push('/productos')
    } else {
      alert('Cliente no encontrado')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a nuestra tienda</h1>
        <div className="mb-4">
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
            Ingrese su DNI
          </label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}

