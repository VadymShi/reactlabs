// /static/main/js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Вхід пройшов успішно');
                window.location.href = '../../index.html';
            } else {
                alert('Неправильне ім\'я користувача або пароль');
            }
        })
        .catch(error => console.error('Error logging in:', error));
    });
});
