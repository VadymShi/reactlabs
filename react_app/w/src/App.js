import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import LogoutComponent from './components/LogoutComponent';
import ChangePasswordComponent from './components/ChangePasswordComponent';
import AddOfficeComponent from './components/AddOfficeComponent';
import AddWorkerComponent from './components/AddWorkerComponent';
import DeleteOfficeComponent from './components/DeleteOfficeComponent';
import WorkerListComponent from './components/WorkerListComponent';
import HomeComponent from './components/HomeComponent';
import './components/main.css'; // підключення стилів

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/logout" element={<LogoutComponent />} />
                <Route path="/change-password" element={<ChangePasswordComponent />} />
                <Route path="/add-office" element={<AddOfficeComponent />} />
                <Route path="/add-worker" element={<AddWorkerComponent />} />
                <Route path="/delete-office" element={<DeleteOfficeComponent />} />
                <Route path="/worker-list" element={<WorkerListComponent />} />
                <Route path="/" element={<HomeComponent />} />
            </Routes>
        </Router>
    );
};

export default App;
