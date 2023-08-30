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
            tableContent.forEach(item => {
                populateTableContent(driverBoardTable, item)
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
})

function populateTableContent(driverBoardTable, item) {
    const row = driverBoardTable.insertRow();
    const id = row.insertCell(0)
    const name = row.insertCell(1)
    const cpf = row.insertCell(2)
    const email = row.insertCell(3)
    const actionsCell = row.insertCell(4);
    id.textContent = item.id
    name.textContent = item.nome
    cpf.textContent = item.cpf
    email.textContent = item.email

    let updateButton = addUpdateButton(item.id)
    let deleteButton = addDeleteButton(item.id);

    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(deleteButton);
}

function addUpdateButton(id) {
    const updateButton = document.createElement('button');
    updateButton.setAttribute('id', id)
    updateButton.addEventListener('click', function () {
        handleUpdate(id)
    })
    updateButton.textContent = 'Update';

    return updateButton
}

function addDeleteButton(id) {
    const deleteButton = document.createElement('button')
    deleteButton.addEventListener('click', function () {
        handleDelete(id)
    })
    deleteButton.textContent = 'Delete';

    return deleteButton
}

function handleUpdate(id) {
    console.log('Update clicked for ID:', id);
}

function handleDelete(id) {
    console.log('Delete clicked for ID:', id);

    fetch(`${Config.apiUrl()}/api/motoristas/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('SHIPPING_API_TOKEN')}`
        }
    })
        .then(
            alert('Item deletado com sucesso!')
        )
        .then(
            location.reload()
        )
        .catch(error => {
            console.error('Erro ao deletar dados da API:', error);
        });
}