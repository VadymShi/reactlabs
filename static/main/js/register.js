// /static/main/js/register.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Реєстрація пройшла успішно');
            window.location.href = '../../templates/registration/login.html';
        })
        .catch(error => console.error('Error registering user:', error));
    });
});
