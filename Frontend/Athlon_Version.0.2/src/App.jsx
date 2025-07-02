import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Principal from './Principal'
import Factura from './components/ComponentsFactura/Factura'
import Cliente from './components/ComponentsCliente/Cliente'
import Plan from './components/ComponentsPlan/Plan'
import Logins from './components/ComponentsLogin/Logins'
import InicioSesionForm from './components/ComponentsLogin/InicioSesionForm'

function App() {

  return (
    // Configuración de las rutas de la aplicación
    // Se utiliza BrowserRouter para manejar el enrutamiento
    // Se definen las rutas y los componentes que se renderizarán para cada una
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InicioSesionForm/>}/>
        <Route path='/Logins' element={<Logins/>}/>
        <Route path='/Principal' element={<Principal/>}/>
        <Route path='/Factura' element={<Factura/>}/>
        <Route path='/Cliente' element={<Cliente/>}/>
        <Route path='/Plan' element={<Plan/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
