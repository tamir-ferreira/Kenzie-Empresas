/* ================= FUNCIONÁRIOS (USERS) ================== */
const urlBase = 'http://localhost:6278'
import { createToast } from "./toastfy.js";


/* ----------------- BUSCAR INFORMAÇÕES DO FUNCIONÁRIO LOGADO ---------------- */
export const getUserInformation = async(token) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/users/profile`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const request = await axios.request(options)
        return request.data
    } catch (error) {
        console.error(error)
    }
}


/* ----------------- LISTAR TODOS OS FUNCIONÁRIOS DO MESMO DEPARTAMENTO ---------------- */
export const listUsersSameDepartment = (token) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/users/departments/coworkers`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- LISTAR OS DEPARTAMENTOS DA EMPRESA DO FUNCIONÁRIO LOGADO ---------------- */
export const listCompanyDepartments = (token) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/users/departments`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- ATUALIZAR INFORMAÇÕES DO FUNCIONÁRIO ---------------- */
export const updateUserInfo = async(body, token) => {
    const options = {
        method: 'PATCH',
        url: `${urlBase}/users`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    try {
        const response = await axios.request(options)

        if (response.statusText == 'OK') {
            const message = 'Informação atualizada com sucesso!'
            sendToast(message, true)
        }
        return true

    } catch (error) {
        const response = error.response.data.error
        if (response == 'body empty') {
            const message = 'Digite a informação a ser atualizada!'
            sendToast(message, false)
        }
    }
}

export const sendToast = (message, status) =>{
        const toast = document.querySelector('.toast')
    if(toast == null){
        createToast(message, status)
        const toast = document.querySelector('.toast')
        setTimeout(() => {
            toast.remove()
        }, 4000);
    }
}


/* ----------------- VERIFICAR O TIPO DE USUÁRIO (ADMIN/USER) ---------------- */
export const checkUserType = async(token) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/auth/validate_user`,
        headers: {
            Authorization: `Bearer ${token}` 
        }
    };
    try {
        const request = await axios.request(options)
        return request.data.is_admin

    } catch (error) {
        console.log(error)
    }
}