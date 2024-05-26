// /static/main/js/logout.js

function logout() {
    fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Вихід пройшов успішно');
        window.location.href = '../../templates/registration/login.html';
    })
    .catch(error => console.error('Error logging out:', error));
}
