// /static/main/js/add_worker.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-worker-form');
    const officesSelect = document.getElementById('worker-offices');

    // Fetch available offices to populate the select options
    fetch('/api/offices')
        .then(response => response.json())
        .then(data => {
            data.forEach(office => {
                const option = document.createElement('option');
                option.value = office.id;
                option.textContent = office.name;
                officesSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching offices:', error));

    // Handle form submission
    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const workerData = {
            name: formData.get('worker-name'),
            email: formData.get('worker-email'),
            birthdate: formData.get('worker-birthdate'),
            offices: Array.from(formData.getAll('worker-offices'))
        };

        fetch('/api/workers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workerData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Працівника додано успішно');
            form.reset();
        })
        .catch(error => console.error('Error adding worker:', error));
    });
});
