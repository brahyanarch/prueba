"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'  // Importar el hook de enrutamiento
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export default function Component() {
  const [account, setAccount] = useState('') // Estado para la cuenta
  const [password, setPassword] = useState('') // Estado para la contraseña
  const [error, setError] = useState('') // Estado para manejar errores
  const router = useRouter()  // Hook para manejar la redirección

  // Función para manejar el envío del formulario
  const handleSubmit = async (e:any) => {
    e.preventDefault() // Prevenir el comportamiento por defecto del formulario

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', { // Reemplazar con tu endpoint de API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          usuario: account, 
          password: password 
        }), // Enviar la cuenta y la contraseña a la API
      })

      if (!response.ok) {
        throw new Error('Error al iniciar sesión') // Lanzar un error si la respuesta no es correcta
      }

      const data = await response.json() // Obtener los datos de la respuesta
      const token = data.token // Asumimos que el token viene en el campo "token"

      // Guardar el token en localStorage o en cookies
      localStorage.setItem('token', token)

      // Redirigir a la página deseada (por ejemplo, el dashboard)
      router.push('/principal/escoger') // Reemplazar con la ruta a la que quieres redirigir

    } catch (error) {
      // Manejar el error y mostrar un mensaje al usuario
      setError('Credenciales incorrectas. Intenta de nuevo.')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">Servicio Medico Primario</CardTitle>
            <div className="flex justify-center mt-4">
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="account">Cuenta</Label>
                <Input 
                  id="account" 
                  placeholder="david" 
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder='******'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mostrar mensaje de error */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <Label htmlFor="remember" className="text-sm">Recordar contraseña</Label>
              </div>
                <Label className='text-blue-600' htmlFor="password">¿Olvidaste tu contraseña?</Label>
              <Button className="w-full bg-blue-600" type="submit" >Iniciar Sesión</Button>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-primary hover:underline">Registrarse</a>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <Image
          src="/images/servicio.jpg"
          alt="Clinica Privada Sanchez Building"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}
