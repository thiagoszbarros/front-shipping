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
                console.log(res)
            })
    }
}

export { Login }