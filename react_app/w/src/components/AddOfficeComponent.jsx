import React, { useState } from 'react';
import './main.css'; // Переконайтеся, що шлях правильний
import logo from "./logo.png"

const AddOfficeComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/add-office/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Додано CSRF токен для безпеки
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                setMessage('Офіс додано успішно!');
            } else {
                const errorData = await response.json();
                setMessage('Помилка при додаванні офісу!');
                console.error('Error:', errorData);
            }
        } catch (error) {
            setMessage('Помилка при додаванні офісу!');
            console.error('Error:', error);
        }
    };

    // Функція для отримання CSRF токена
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; cookies.length; i++) {
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
                        <li><button onClick={() => window.location.href='/'} className="head-button">Головна сторінка</button></li>
                        <li><button onClick={() => window.location.href='/add-worker'} className="head-button">Додати працівника</button></li>
                        <li><button onClick={() => window.location.href='/add-office'} className="head-button">Додати офіс</button></li>
                        <li><button onClick={() => window.location.href='/delete-office'} className="head-button">Список офісів</button></li>
                        <li><button onClick={() => window.location.href='/worker-list'} className="head-button">Список робітників</button></li>
                    </ul>
                </div>
            </header>

            <main>
                <h1>Додати Офіс</h1>
                <form id="addOfficeForm" className="form-2">
                    <div className="form-group">
                        <input className="form-input" name="name" placeholder=" " required value={formData.name} onChange={handleChange} />
                        <label className="form-label">Назва</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="location" placeholder=" " required value={formData.location} onChange={handleChange} />
                        <label className="form-label">Локація</label>
                    </div>
                    <button type="button" className="head-button" onClick={handleSubmit}>Відправити</button>
                </form>
                <div id="message">{message}</div>
            </main>

            <footer>
                <p>&copy; 2024 Workers. Усі права захищено.</p>
            </footer>
        </div>
    );
};

export default AddOfficeComponent;



