'use client'
import { useState } from 'react'

// Productos predefinidos
const products = [
  { id: 'P001', name: 'Producto 1', price: 50 },
  { id: 'P002', name: 'Producto 2', price: 50 },
  { id: 'P003', name: 'Producto 3', price: 10 },
  { id: 'P004', name: 'Producto 4', price: 20 },
]

export default function Home() {
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])
  const [invoicePdf, setInvoicePdf] = useState<string | null>(null)

  // Función para añadir un producto al carrito
  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Función para generar la factura
  const generateInvoice = async () => {
    const invoiceData = {
      ublVersion: '2.1',
      tipoOperacion: '0101',
      tipoDoc: '03',
      serie: 'B001',
      correlativo: '1',
      fechaEmision:"2021-01-27T00:00:00-05:00",
      formaPago: {
        moneda: 'PEN',
        tipo: 'Contado',
      },
      tipoMoneda: 'PEN',
      client: {
        tipoDoc: '6',
        numDoc: 20000000002,
        rznSocial: 'Cliente',
        address: {
          direccion: 'Direccion cliente',
          provincia: 'LIMA',
          departamento: 'LIMA',
          distrito: 'LIMA',
          ubigueo: '150101',
        },
      },
      company: {
        ruc: 10755482370,
        razonSocial: 'Mi empresa',
        nombreComercial: 'Mi empresa',
        address: {
          direccion: 'Direccion empresa',
          provincia: 'LIMA',
          departamento: 'LIMA',
          distrito: 'LIMA',
          ubigueo: '150101',
        },
      },
      mtoOperGravadas: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      mtoIGV: cart.reduce((total, item) => total + item.price * item.quantity * 0.18, 0),
      valorVenta: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      totalImpuestos: cart.reduce((total, item) => total + item.price * item.quantity * 0.18, 0),
      subTotal: cart.reduce((total, item) => total + item.price * item.quantity, 0) + 
                cart.reduce((total, item) => total + item.price * item.quantity * 0.18, 0),
      mtoImpVenta: cart.reduce((total, item) => total + item.price * item.quantity, 0) + 
                   cart.reduce((total, item) => total + item.price * item.quantity * 0.18, 0),
      details: cart.map(item => ({
        codProducto: item.id,
        unidad: 'NIU',
        descripcion: item.name,
        cantidad: item.quantity,
        mtoValorUnitario: item.price,
        mtoValorVenta: item.price * item.quantity,
        mtoBaseIgv: item.price * item.quantity,
        porcentajeIgv: 18,
        igv: item.price * item.quantity * 0.18,
        tipAfeIgv: 10,
        totalImpuestos: item.price * item.quantity * 0.18,
        mtoPrecioUnitario: item.price * 1.18,
      })),
      legends: [
        {
          code: '1000',
          value: `SON ${new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(cart.reduce((total, item) => total + item.price * item.quantity, 0) + cart.reduce((total, item) => total + item.price * item.quantity * 0.18, 0))} SOLES`
        }
      ]
    }

    try {
      const response = await fetch('https://facturacion.apisperu.com/api/v1/invoice/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhdmlkZWZxb24iLCJjb21wYW55IjoiMTA3NTU0ODIzNzAiLCJpYXQiOjE3MjE4NDMzNjcsImV4cCI6ODAyOTA0MzM2N30.WnHQXCEM-fiSFmXj8tlUwQNx96TARmyokFnPWjQuUSD9-r5QiiYDQegmMSv9innX_-jLceJdkBGaLsV9Qr-4RdT1myfqnd-9gqsf-p0CfmUxFWzdo99oyNdsy03S9h1kCVVjjc9PV62Co-qfSbLK8BMfFAxF9nXBfsNLs_qGrokxlEjbySwnHULVUueKR1_JekNYZ5BEUHJuJ0SMTIsdirYBudIa0WoOfKG1o-cmpA9BStnZS8touO-JYy7_OGElCH11H2s1DoK2bgAfC4RIqhjr8seVx1ut21B5Hos78bEpcDsJsU02sHX-cNsVS6dgAshuBwtwiE8IVjIVd6ot5Pl5WxrTXC7hDhO66svDW_slBDRSf_o7tvGLMzR1kiZx5USdp8uGVfs_DhRdnWQqKo-ciDNyzSrrMc5BU1sBsj7s1ZHpqKUc1sFd875QnJCnpcWtGKKtz_f4cf5AQvvdVL88uVDi0O2BBmw3RjXBwm8uz4Fw_OEHO5bqwvLfq3Br_2My4Y_gfWyfpC5gHeU63fs3IoFmpxQu7F0fne6SGEpnET8pflAEuTjvAijlQJpdF68Vt2fO4EY4E-X0FeDk8DF6bH9r4N8t3KTHt_53TAW6JUP70PpGChMZkTuLJhu8wnFeCN9ZfQhccf4cD6ZsZFDlWdGsQNimsunXIKh6JTU'
        },
        body: JSON.stringify(invoiceData),
      })
      console.log(invoiceData," invoiceData");
      console.log(addToCart," invoiceData");
      console.log(response)
      if (response.ok) {
        const blob = await response.blob()
        const pdfUrl = URL.createObjectURL(blob)
        setInvoicePdf(pdfUrl)
      } else {
        console.error('Error al generar la factura')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tienda Simple</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Productos</h2>
          {products.map((product) => (
            <div key={product.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Precio: S/. {product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Carrito</h2>
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="mb-2">
                  <span>{item.name} (x{item.quantity}) - S/. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <p className="font-bold mt-4">
                Total: S/. {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <button
                onClick={generateInvoice}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Generar Factura
              </button>
            </>
          )}
        </div>
      </div>

      {invoicePdf && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Factura Generada</h2>
          <iframe src={invoicePdf} width="100%" height="600px" />
        </div>
      )}
    </div>
  )
}
