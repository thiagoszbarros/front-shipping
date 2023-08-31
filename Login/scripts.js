import { Config } from "../config.js";

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        login(email, password)
    } catch (error) {
        alert('Erro inesperado')
    }
});

function login(email, password){
    fetch(`${Config.apiUrl()}/api/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.error == 'Unauthorized') {
                alert('Email ou senha inválidos.')
                return
            }
            localStorage.setItem('SHIPPING_API_TOKEN', res.access_token)
            location.href = `${location.origin}/Dashboard`
        })
}