import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './Component/Create'
import Edituser from './Component/Edituser'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Create/>}/>
      <Route path="/edituser/:id" element={<Edituser/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App