import { Config } from "../../config.js";

document.addEventListener('DOMContentLoaded', function () {
    const driverBoardTable = document.getElementById('drivers-board-table');

    fetch(`${Config.apiUrl()}/api/motoristas`, {
        method: 'GET',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('SHIPPING_API_TOKEN')}`
        }
    })
        .then(res => res.json())
        .then(res => {
            let tableContent = res.data
            console.log(res.data)
            tableContent.forEach(item => {
                const row = driverBoardTable.insertRow();
                const id = row.insertCell(0)
                id.textContent = item.id
                const name = row.insertCell(1)
                name.textContent = item.nome
                const cpf = row.insertCell(2)
                cpf.textContent = item.cpf
                const email = row.insertCell(3)
                email.textContent = item.email
                const actionsCell = row.insertCell(4);
                
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click', () => {
                    console.log('Update clicked for ID:', item.id);
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    console.log('Delete clicked for ID:', item.id);
                });

                actionsCell.appendChild(updateButton);
                actionsCell.appendChild(deleteButton);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
})