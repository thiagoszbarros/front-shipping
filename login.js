import { Config } from "./config.js"
class Login {
    static login = (email, password) => {
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
            })
    }
}

export { Login }