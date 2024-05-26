import React, { useState, useEffect } from 'react';
import './main.css';
import logo from "./logo.png"

const WorkerListComponent = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        fetch('/api/workers/?format=json')
            .then((response) => response.json())
            .then((data) => setWorkers(data));
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`/api/workers/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 204) {
            setWorkers(workers.filter((worker) => worker.id !== id));
        } else {
            console.error('Помилка видалення:', response.statusText);
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
                <h1>Список працівників</h1>
                <div id="workers-list">
                    {workers.length > 0 ? (
                        <div className="cards-container">
                            {workers.map((worker) => (
                                <div key={worker.id} className="card">
                                    <div className="card-header">
                                        <div className="title">{worker.first_name} {worker.last_name}</div>
                                    </div>
                                    <div className="card-content">
                                        <p><strong>Дата народження:</strong> {worker.birth_date}</p>
                                        <p><strong>Дата найму:</strong> {worker.hire_date}</p>
                                        <p><strong>Професія:</strong> {worker.profession}</p>
                                    </div>
                                    <button className="card-button" onClick={() => handleDelete(worker.id)}>Видалити
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">Робітників не знайдено</p>
                    )}
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Workers. Усі права захищено.</p>
            </footer>
        </div>
    );
};

export default WorkerListComponent;
