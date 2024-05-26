import React, { useState } from 'react';
import './main.css'; // Переконайтеся, що шлях правильний
import logo from "./logo.png"

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Додано CSRF токен для безпеки
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.message === 'Logged in successfully') {
            window.location.href = '/';
        } else {
            setMessage('Помилка при вході!');
        }
    };

    // Функція для отримання CSRF токена
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    return (
        <div>
            <header>
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
            </header>
            <main>
                <h1>Увійти в акаунт</h1>
                <form id="loginForm" className="form-2">
                    <div className="form-group">
                        <input className="form-input" name="email" placeholder=" " required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label">Пошта</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="password" placeholder=" " type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label">Пароль</label>
                    </div>
                    <ul>
                        <li><button type="button" className="head-button" onClick={handleSubmit}>Увійти</button></li>
                        <li><button type="button" className="head-button" onClick={() => window.location.href = '/register'}>Зареєструватися</button></li>
                    </ul>
                </form>
                <div id="message">{message}</div>
            </main>
            <footer>
                <p>&copy; 2024 Workers. Усі права захищено.</p>
            </footer>
        </div>
    );
};

export default LoginComponent;
