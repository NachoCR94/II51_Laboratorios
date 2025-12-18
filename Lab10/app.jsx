import { useState } from 'react'
import './App.css'

function App() {
  // Estado para el contador (count is 0)
  const [count, setCount] = useState(0)

  // Datos de ejemplo para la lista de la imagen
  const usuarios = [
    { id: 1, nombre: "Andrea Martínez", email: "andrea.martinez@email.com" },
    { id: 2, nombre: "Verónica Ríos", email: "veronica.rios@email.com" },
    { id: 3, nombre: "Juan Navarro", email: "juan.navarro@email.com" }
  ]

  return (
    <>
      <div className="logos">
        {/* Aquí irían los logos de Vite y React */}
        <span style={{fontSize: '5rem'}}>⚡⚛️</span>
      </div>
      
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} 
                style={{background: '#1a1a1a', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer'}}>
          count is {count}
        </button>
        <p style={{color: '#888', marginTop: '15px'}}>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <div style={{margin: '20px 0'}}>
        {/* Imagen del avatar central */}
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
             alt="avatar" style={{width: '100px', background: 'white', borderRadius: '8px'}} />
      </div>

      <p style={{color: '#666'}}>Click on the Vite and React logos to learn more</p>

      {/* LISTA DE USUARIOS (La parte inferior de tu imagen) */}
      <div className="card-lista">
        {usuarios.map(user => (
          <div key={user.id} className="usuario-row">
            <span className="btn-activo">Activo</span>
            <span style={{flex: 1}}>{user.nombre} - {user.email}</span>
            <button className="btn-eliminar">X</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App

