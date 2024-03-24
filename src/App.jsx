import React from 'react'
import './App.css'
import { Home } from './components/home/Home'
import { Results } from './components/results/Results'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'



const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/results" element={<Results/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;