import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashbord from './pages/Dashbord'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
   <>
   
   <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<Home/>} />
      <Route path="/dashbord" element={<Dashbord/>} />

   </Routes>

   <ToastContainer/>
   </>
  )
}

export default App