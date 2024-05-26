import React, { useState, useEffect } from 'react';
import './main.css'; // Переконайтеся, що шлях правильний
import logo from "./logo.png"

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birth_date: '', // Додано поле для дати народження
    });
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        fetch('/api/get-csrf-token/')
            .then(response => response.json())
            .then(data => setCsrfToken(data.csrfToken));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.id) {
            setMessage('Реєстрація успішна!');
            window.location.href = '/login'; // Пересилання на домашню сторінку входу
        } else {
            setMessage('Помилка реєстрації!');
        }
    };

    return (
        <div>
            <header>
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
            </header>
            <main>
                <h1>Реєстрація</h1>
                <form id="registrationForm" className="form-2">
                    <div className="form-group">
                        <input className="form-input" name="username" placeholder=" " required onChange={handleChange} />
                        <label className="form-label">Ім'я користувача</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="first_name" placeholder=" " required onChange={handleChange} />
                        <label className="form-label">Ім'я</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="last_name" placeholder=" " required onChange={handleChange} />
                        <label className="form-label">Прізвище</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="email" placeholder=" " type="email" required onChange={handleChange} />
                        <label className="form-label">Пошта</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="password" placeholder=" " type="password" required onChange={handleChange} />
                        <label className="form-label">Пароль</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="birth_date" placeholder=" " type="date" required onChange={handleChange} />
                        <label className="form-label">Дата народження</label>
                    </div>
                    <ul>
                        <li><button type="button" className="head-button" onClick={handleSubmit}>Зареєструватися</button></li>
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

export default RegisterComponent;
