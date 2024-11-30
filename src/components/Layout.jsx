import React from 'react';
import Navbar from './Navbar';  
import Footer from './Footer';
import '../assets/styles/Layout.css';  

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            
            {/* Nội dung chính của mỗi trang */}
            <div className="content">
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default Layout;