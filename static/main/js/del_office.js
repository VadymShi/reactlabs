// /static/main/js/del_office.js

document.addEventListener('DOMContentLoaded', () => {
    const officesList = document.getElementById('offices-list');

    // Fetch and display offices
    fetch('/api/offices')
        .then(response => response.json())
        .then(data => {
            data.forEach(office => {
                const officeDiv = document.createElement('div');
                officeDiv.className = 'office';
                officeDiv.innerHTML = `
                    <p>Назва: ${office.name}</p>
                    <button onclick="deleteOffice(${office.id})">Видалити офіс</button>
                `;
                officesList.appendChild(officeDiv);
            });
        })
        .catch(error => console.error('Error fetching offices:', error));
});

function deleteOffice(officeId) {
    fetch(`/api/offices/${officeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Офіс видалено успішно');
        window.location.reload();
    })
    .catch(error => console.error('Error deleting office:', error));
}
