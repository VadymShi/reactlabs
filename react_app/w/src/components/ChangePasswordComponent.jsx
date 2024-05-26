import React, { useState } from 'react';
import './main.css';
import logo from "./logo.png"

const ChangePasswordComponent = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/change-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Пароль змінено успішно');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                setMessage(data.message || 'Помилка при зміні пароля');
            }
        } catch (error) {
            console.error('Помилка при зміні пароля:', error);
            setMessage('Помилка при зміні пароля');
        }
    };

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
                <h1>Змінити пароль</h1>
                <form onSubmit={handleChangePassword} className="form-2">
                    <div className="form-group">
                        <input
                            className="form-input"
                            type="password"
                            name="current_password"
                            placeholder=" "
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <label className="form-label">Поточний пароль</label>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-input"
                            type="password"
                            name="new_password"
                            placeholder=" "
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label className="form-label">Новий пароль</label>
                    </div>
                    <button type="submit" className="head-button">Змінити пароль</button>
                </form>
                {message && <div className="message">{message}</div>}
            </main>
            <footer>
                <p>&copy; 2024 Workers. Усі права захищено.</p>
            </footer>
        </div>
    );
};

export default ChangePasswordComponent;
