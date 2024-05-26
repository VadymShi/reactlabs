import React, { useEffect, useState } from 'react';
import './main.css'; // Переконайтеся, що шлях правильний
import logo from "./logo.png"

const OfficeListComponent = () => {
    const [offices, setOffices] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchOffices();
    }, []);

    const fetchOffices = async () => {
        try {
            const response = await fetch('/api/offices/');
            const data = await response.json();
            setOffices(data);
        } catch (error) {
            console.error('Помилка завантаження даних:', error);
            setMessage('Помилка завантаження даних');
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

    const deleteOffice = async (id) => {
        try {
            const response = await fetch(`/api/offices/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Додано CSRF токен
                },
            });
            if (response.ok) {
                setMessage('Офіс видалено');
                fetchOffices(); // Оновлюємо список офісів
            } else {
                setMessage('Помилка при видаленні офісу');
            }
        } catch (error) {
            console.error('Помилка видалення:', error);
            setMessage('Помилка при видаленні офісу');
        }
    };

    return (
        <div>
            <header>
                <div className="logo">
                    <a href="/"><img src={logo} alt="Logo"/></a>
                </div>
                <div className="s-head">
                    <ul>
                        <li><button onClick={() => window.location.href = '/'} className="head-button">Головна сторінка</button></li>
                        <li><button onClick={() => window.location.href = '/add-worker'} className="head-button">Додати працівника</button></li>
                        <li><button onClick={() => window.location.href = '/add-office'} className="head-button">Додати офіс</button></li>
                        <li><button onClick={() => window.location.href = '/delete-office'} className="head-button">Список офісів</button></li>
                        <li><button onClick={() => window.location.href = '/worker-list'} className="head-button">Список робітників</button></li>
                    </ul>
                </div>
            </header>

            <main>
                <h1>Список офісів</h1>
                <div id="offices-list">
                    {message && <p className="text-danger">{message}</p>}
                    {offices.length > 0 ? (
                        <div className="cards-container">
                            {offices.map((office) => (
                                <div className="card" key={office.id}>
                                    <div className="card-header">
                                        <div className="title">Офіс {office.id}</div>
                                    </div>
                                    <div className="card-content">
                                        <p><strong>Назва:</strong> {office.name}</p>
                                        <p><strong>Локація:</strong> {office.location}</p>
                                    </div>
                                    <button className="card-button" onClick={() => deleteOffice(office.id)}>Видалити</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">Офісів не знайдено</p>
                    )}
                </div>
            </main>

            <footer>
                <p>&copy; 2024 Workers. Усі права захищено.</p>
            </footer>
        </div>
    );
};

export default OfficeListComponent;
