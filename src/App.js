import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HospitalDatabase from './pages/HospitalDatabase';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true);

    return (
        <Router>
            <Routes>
                {!isLoggedIn ? (
                    <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                ) : (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/hospital-database" element={<HospitalDatabase />} />
                        <Route path="/" element={<Dashboard />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;