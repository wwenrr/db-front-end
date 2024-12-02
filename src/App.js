import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HospitalDatabase from './pages/HospitalDatabase';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hospital-database" element={<HospitalDatabase />} />
        </Routes>
    );
};

export default App;
