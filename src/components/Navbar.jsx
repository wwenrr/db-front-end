import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const url = 'https://db-latest-nprr.onrender.com'; 

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(`${url}/logout`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Đăng xuất thất bại');
            }

            const data = await response.json();

            if (data.code === 200) {
                alert('Đăng xuất thành công!');
                navigate('/'); 
            } else {
                alert(data.msg || 'Có lỗi xảy ra trong quá trình đăng xuất');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error.message);
            alert(error.message);
        }
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-link">
                <i className="fas fa-home"></i>
            </Link>

            <Link to="/hospital-database" className="navbar-link">
                <i className="fas fa-bars"></i>
            </Link>

            <Link to="/" onClick={handleLogout} className="navbar-link logout">
                <i className="fas fa-sign-out-alt"></i>
            </Link>
        </nav>
    );
};

export default Navbar;