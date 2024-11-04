import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Abastecimento from './pages/Abastecimento/Abastecimento'
import Home from './pages/Home/Home'
import Telemetria from './pages/Telemetria/Telemetria'


function App() {



  return (
    // basename='bi'

    <BrowserRouter >
      < Routes >
        {/* <Route path="/*" element={<Telemetria />} /> */}
        <Route path="/*" element={<Home />} />
        <Route path="/abastecimento/*" element={<Abastecimento />} />
        <Route path="/telemetria/*" element={<Telemetria />} />
      </Routes >

    </BrowserRouter >
  )
}

export default App
