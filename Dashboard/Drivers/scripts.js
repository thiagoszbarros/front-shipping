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
            verifyContent(tableContent)
            tableContent.forEach(item => {
                populateTableContent(driverBoardTable, item)
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });

    const createDriverForm = document.getElementById('createDriverForm');

    createDriverForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const data_nascimento = document.getElementById('data_nascimento').value;
        const email = document.getElementById('email').value;
        const transportadora_id = document.getElementById('transportadora').value;
        const data = {
            nome: name,
            cpf: cpf,
            data_nascimento: data_nascimento,
            email: email,
            transportadora_id: transportadora_id
        };
        createDriver(data);
    });
})

function populateTableContent(driverBoardTable, item) {
    const row = driverBoardTable.insertRow();
    const id = row.insertCell(0)
    const name = row.insertCell(1)
    const cpf = row.insertCell(2)
    const email = row.insertCell(3)
    const actionsCell = row.insertCell(4)
    const updateButton = addUpdateButton(item.id, item)
    const deleteButton = addDeleteButton(item.id)

    id.textContent = item.id
    name.textContent = item.nome
    cpf.textContent = item.cpf
    email.textContent = item.email
    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(deleteButton);
}

function addUpdateButton(id, item) {
    const updateButton = document.createElement('button');
    updateButton.setAttribute('id', id)
    updateButton.addEventListener('click', function () {
        displayUpdateModal(item);
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

function handleDelete(id) {
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
            console.error('Erro ao deletar motorista.')
        });
}

function verifyContent(tableContent) {
    if (typeof tableContent != 'object') {
        localStorage.removeItem('SHIPPING_API_TOKEN')
        location.href = location.origin
        return
    }
}

function createDriver(data) {

    fetch(`${Config.apiUrl()}/api/motoristas`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('SHIPPING_API_TOKEN')}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            if (response.errors) {
                alert(response.message);
                return
            }

            alert(response)
            location.reload()
        })
        .catch(error => {
            alert('Erro ao criar registro de motorista')
        });
}

function displayUpdateModal(item) {
    const updateModal = document.getElementById('updateDriverModal')
    const updateNameInput = document.getElementById('updateName')
    const updateCpfInput = document.getElementById('updateCpf')
    const updateDataNascimentoInput = document.getElementById('updateDataNascimento')
    const updateEmailInput = document.getElementById('updateEmail')
    updateNameInput.value = item.nome
    updateCpfInput.value = item.cpf
    updateDataNascimentoInput.value = item.data_nascimento ?? null
    updateEmailInput.value = item.email

    const closeUpdateModal = document.getElementById('closeUpdateModal')
    closeUpdateModal.addEventListener('click', function () {
        updateModal.style.display = 'none';
    });

    const updateDriverForm = document.getElementById('updateDriverForm')
    updateDriverForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const updatedData = {
            nome: updateNameInput.value,
            cpf: updateCpfInput.value,
            data_nascimento: updateDataNascimentoInput.value,
            email: updateEmailInput.value
        }

        updateDriver(item.id, updatedData)
    });
}

function updateDriver(id, updatedData) {
    fetch(`${Config.apiUrl()}/api/motoristas/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('SHIPPING_API_TOKEN')}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (response.status == 204) {
                alert('Motorista atualizado com sucesso')
                location.reload()
            } else {
                if (response.errors) {
                    alert(response.message)
                    location.reload()
                }
            }
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao atualizar o motorista')
        });
}