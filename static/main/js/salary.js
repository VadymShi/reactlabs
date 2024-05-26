// /static/main/js/salary.js

document.addEventListener('DOMContentLoaded', () => {
    const workersList = document.getElementById('workers-list');

    // Fetch and display workers
    fetch('/api/workers')
        .then(response => response.json())
        .then(data => {
            data.forEach(worker => {
                const workerDiv = document.createElement('div');
                workerDiv.className = 'worker';
                workerDiv.innerHTML = `
                    <p>Ім'я: ${worker.name}</p>
                    <p>Дата народження: ${worker.birthDate}</p>
                    <p>Email: ${worker.email}</p>
                    <button onclick="viewWorker(${worker.id})">Переглянути</button>
                `;
                workersList.appendChild(workerDiv);
            });
        })
        .catch(error => console.error('Error fetching workers:', error));
});

function viewWorker(workerId) {
    fetch(`/api/workers/${workerId}`)
        .then(response => response.json())
        .then(worker => {
            alert(`Ім'я: ${worker.name}\nДата народження: ${worker.birthDate}\nEmail: ${worker.email}`);
        })
        .catch(error => console.error('Error fetching worker:', error));
}
