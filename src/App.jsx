import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChooseSkipSizePage from './pages/ChooseSkipSizePage'
import 'primereact/resources/themes/lara-dark-blue/theme.css'; // Choose your preferred theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<ChooseSkipSizePage />} />
      </Routes>
    </div>
  )
}

export default App
