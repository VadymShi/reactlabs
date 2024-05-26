// /static/main/js/add_office.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-office-form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const officeData = {
            name: formData.get('office-name')
        };

        fetch('/api/offices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(officeData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Офіс додано успішно');
            form.reset();
        })
        .catch(error => console.error('Error adding office:', error));
    });
});
