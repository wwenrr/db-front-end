import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../assets/styles/LoginForm.css';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dữ liệu đăng nhập mẫu
        if (username === 'Manager' && password === 'password') {
            onLogin();
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="login-page">
            <Header />
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Đăng nhập</h2>
                    <div className="input-group">
                        <label>Tên đăng nhập:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Đăng nhập</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default LoginForm;