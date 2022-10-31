/* ================= ROTAS QUE NÃO UTILIZAM TOKEN ================== */

import { createToast } from "./toastfy.js";


/* ----------------- CRIAR USUÁRIO ---------------- */
export const createUser = async (body) => {
    const options = {
        method: 'POST',
        url: 'http://localhost:6278/auth/register',
        headers: { 'Content-Type': 'application/json' },
        data: body
    };

    try {
        const request = await axios.request(options)
        // console.log(request);
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
                message = 'Email já cadastrado. Tente novamente!'
                console.log('erro email duplicado')
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
        url: 'http://localhost:6278/auth/login',
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
        console.log(error)
        const response = error.response.data.error
        // .forEach(error => {
        let message
        if (response == 'email invalid!') {
            message = 'Email inválido. Verifique e tente novamente!'
            createToast(message, false)
            return 'email'
        }
        if (response == 'password invalid!') {
            message = 'Senha não confere. Tente novamente!'
            // console.log('erro email duplicado')
            createToast(message, false)
            return 'senha'
        }
    }
}


/* ----------------- LISTAR TODAS AS EMPRESAS ---------------- */
const listAllCompanys = () => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/companies',
        headers: { Authorization: 'Bearer ' }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- LISTAR EMPRESAS POR SETOR ---------------- */
const listCompanysBySector = () => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/companies/Alimenticio',
        headers: { Authorization: 'Bearer ' }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- LISTAR TODOS OS SETORES ---------------- */
const listAllSectors = () => {
    const options = { method: 'GET', url: 'http://localhost:6278/sectors' };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}