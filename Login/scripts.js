import { Login } from "../login.js";

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        Login.login(email, password)
    } catch (error) {
        alert('Erro inesperado')
    }
});

