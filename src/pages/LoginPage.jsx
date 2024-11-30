import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ onLogin }) => {
    return (
        <div className="login-page">
            <LoginForm onLogin={onLogin} />
        </div>
    );
};

export default LoginPage;
