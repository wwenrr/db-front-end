import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../assets/styles/LoginForm.css';

const url = 'https://db-latest-nprr.onrender.com';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch(`${url}/login`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Đăng nhập thất bại');
            }
    
            const data = await response.json();
    
            if (data.code === 200 && data.message.token) {
                // Lưu token vào localStorage
                localStorage.setItem('token', data.message.token);
                alert('Đăng nhập thành công!');
                navigate('/dashboard');  
            } else {
                alert(data.msg || 'Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error.message);
            alert(error.message);
        } finally {
            setLoading(false);
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
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default LoginForm;