// /static/main/js/main.js

function loadWorkers() {
    fetch('/api/workers')
        .then(response => response.json())
        .then(data => {
            const workersList = document.getElementById('workers-list');
            workersList.innerHTML = ''; // Очистити існуючий вміст

            data.forEach(worker => {
                const workerDiv = document.createElement('div');
                workerDiv.className = 'worker';
                workerDiv.innerHTML = `
                    <p>Ім'я: ${worker.name}</p>
                    <p>Дата народження: ${worker.birthDate}</p>
                    <p>Email: ${worker.email}</p>
                `;
                workersList.appendChild(workerDiv);
            });
        })
        .catch(error => console.error('Помилка при отриманні робітників:', error));
}
