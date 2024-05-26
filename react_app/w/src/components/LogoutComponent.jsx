import React from 'react';
import './main.css'; // Переконайтеся, що шлях правильний
import logo from "./logo.png"

const LogoutComponent = () => {
    const handleLogout = async () => {
        const response = await fetch('/api/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Додано CSRF токен для безпеки
            },
        });
        const data = await response.json();
        if (data.message === 'Logged out successfully') {
            window.location.href = '/login';
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
                <div className="user-log-out">
                    <h1>Ви успішно вийшли з акаунту!</h1>
                    <ul>
                        <li>
                            <button onClick={() => window.location.href = '/login'} className="user-log-out-button">Зайти в акаунт</button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/register'} className="user-log-out-button">Зареєстуватися</button>
                        </li>
                    </ul>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Workers. Усі права захищено.</p>
            </footer>
        </div>
    );
};

export default LogoutComponent;
