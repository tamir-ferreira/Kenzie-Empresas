/* ================= ROTAS QUE NÃO UTILIZAM TOKEN ================== */
const urlBase = 'http://localhost:6278'
import { createToast } from "./toastfy.js";


/* ----------------- CRIAR USUÁRIO ---------------- */
export const createUser = async (body) => {
    const options = {
        method: 'POST',
        url: `${urlBase}/auth/register`,
        headers: { 'Content-Type': 'application/json' },
        data: body
    };

    try {
        const request = await axios.request(options)
        if (request.statusText = 'Created') {
            let message = 'Cadastrado com sucesso! Redirecionando para o Login...'
            createToast(message, true)
            return true
        }

    } catch (error) {
        error.response.data.error.forEach(error => {
            let message
            if (error == 'insert a valid email!') {
                message = 'Email inválido. Verifique e tente novamente!'
            }

            if (error == 'email alread exists!') {
                message = `Email já cadastrado.
                 Tente novamente ou <a href='./login.html'>faça Login</a>`
            }
            createToast(message, false)
        });

        return false
    }
}


/* ----------------- LOGIN ---------------- */
export const login = async (body) => {
    const options = {
        method: 'POST',
        url: `${urlBase}/auth/login`,
        headers: { 'Content-Type': 'application/json' },
        data: body
    };

    try {
        const request = await axios.request(options)

        if (request.statusText === "OK") {
            const userId = request.data.token
            localStorage.setItem('@kenzieEmpresas-userId', userId)
            return 'OK'
        }

    } catch (error) {
        const response = error.response.data.error
        let message

        if (response == 'email invalid!') {
            message = 'Email inválido. Verifique e tente novamente!'
            createToast(message, false)
            return 'email'
        }

        if (response == 'password invalid!') {
            message = 'Senha não confere. Tente novamente!'
            createToast(message, false)
            return 'senha'
        }
    }
}


/* ----------------- LISTAR TODAS AS EMPRESAS ---------------- */
export const getAllCompanys = async () => {
    const options = {
        method: 'GET',
        url: `${urlBase}/companies`
    };

    try {
        const request = await axios.request(options)
        return request.data

    } catch (error) {
        console.error(error)
    }
}


/* ----------------- LISTAR EMPRESAS POR SETOR ---------------- */
export const getCompanysBySector = async (sector) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/companies/${sector}`
    };

    try {
        const request = await axios.request(options)
        return request.data

    } catch (error) {
        console.error(error)
    }
}


/* ----------------- LISTAR TODOS OS SETORES ---------------- */
export const getAllSectors = async () => {
    const options = {
        method: 'GET',
        url: `${urlBase}/sectors`
    };

    try {
        const request = await axios.request(options)
        return request.data

    } catch (error) {
        console.error(error)
    }
}