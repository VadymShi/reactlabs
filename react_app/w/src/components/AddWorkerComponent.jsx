import React, { useState, useEffect } from 'react';
import './main.css'; // Переконайтеся, що шлях правильний
import logo from "./logo.png"

const AddWorkerComponent = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        hire_date: '',
        profession: '',
        offices: []
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        getCSRFToken();
    }, []);

    const getCSRFToken = async () => {
        const response = await fetch('/api/get-csrf-token/');
        const data = await response.json();
        document.cookie = `csrftoken=${data.csrfToken}; path=/;`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/add-worker/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                setMessage('Працівника додано успішно!');
            } else {
                const errorData = await response.json();
                setMessage('Помилка при додаванні працівника!');
                console.error('Error:', errorData);
            }
        } catch (error) {
            setMessage('Помилка при додаванні працівника!');
            console.error('Error:', error);
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
                    <a href="/"><img src={logo} alt="Logo"/></a>
                </div>
                <div className="s-head">
                    <ul>
                        <li>
                            <button onClick={() => window.location.href = '/'} className="head-button">Головна
                                сторінка
                            </button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/add-worker'} className="head-button">Додати
                                працівника
                            </button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/add-office'} className="head-button">Додати
                                офіс
                            </button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/delete-office'}
                                    className="head-button">Список офісів
                            </button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/worker-list'} className="head-button">Список
                                робітників
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            <main>
                <h1>Додати Працівника</h1>
                <form id="addWorkerForm" className="form-2">
                    <div className="form-group">
                        <input className="form-input" name="first_name" placeholder=" " required
                               value={formData.first_name} onChange={handleChange}/>
                        <label className="form-label">Ім'я</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="last_name" placeholder=" " required
                               value={formData.last_name} onChange={handleChange}/>
                        <label className="form-label">Прізвище</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="birth_date" placeholder=" " type="date" required value={formData.birth_date} onChange={handleChange} />
                        <label className="form-label">Дата народження</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="hire_date" placeholder=" " type="date" required value={formData.hire_date} onChange={handleChange} />
                        <label className="form-label">Дата найму</label>
                    </div>
                    <div className="form-group">
                        <input className="form-input" name="profession" placeholder=" " required value={formData.profession} onChange={handleChange} />
                        <label className="form-label">Професія</label>
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

export default AddWorkerComponent;
