import { Config } from "../../config.js";

document.addEventListener('DOMContentLoaded', function () {
    const driverBoard = document.getElementById('drivers-board');

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
            driverBoard.innerText = res.data
        })
})