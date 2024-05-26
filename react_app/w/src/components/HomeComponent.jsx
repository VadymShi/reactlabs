import React, { useState, useEffect } from 'react';
import './main.css';
import logo from "./logo.png"

const HomeComponent = () => {
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/user-info/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    setMessage('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setMessage('An error occurred');
            }
        };

        fetchUserInfo();
    }, []);

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
                    <a href="/"><img src={logo} alt="Logo"/></a>
                </div>
                <div className="s-head">
                    <ul>
                        <li>
                            <button onClick={() => window.location.href = '/'} className="head-button">Головна сторінка</button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/add-worker'} className="head-button">Додати працівника</button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/add-office'} className="head-button">Додати офіс</button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/delete-office'} className="head-button">Список офісів</button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/worker-list'} className="head-button">Список робітників</button>
                        </li>
                    </ul>
                </div>
            </header>

            <main>
                <h1>Ваша сторінка</h1>
                <div className="user-info">
                    <p>Ім'я користувача: {userInfo.username}</p>
                    <p>Email: {userInfo.email}</p>
                    <ul>
                        <li>
                            <button
                                onClick={() => window.location.href = '/change-password'}
                                className="user-info-button">Змінити пароль
                            </button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/logout'}
                                    className="user-info-button">Вийти з акаунту
                            </button>
                        </li>
                    </ul>
                </div>
                {message && <div className="message">{message}</div>}
            </main>

            <footer>
                <p>&copy; 2024 Workers. Усі права захищено.</p>
            </footer>
        </div>
    );
};

export default HomeComponent;
