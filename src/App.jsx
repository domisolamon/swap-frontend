import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import Swap from './components/Swap';
import Liquidity from './components/Liquidity';
import Farms from './components/Farms';
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="swap" element={<Swap />}></Route>
                    <Route path="liquidity" element={<Liquidity />}></Route>
                    <Route path="farms" element={<Farms />}></Route>
                </Route>
            </Routes>
            <ToastContainer style={{ fontSize: '15px', width: '400px', fontWeight: 'bold' }} position="top-center" theme='colored' />
        </BrowserRouter>
    )
}

export default App
