/* ================= FUNCIONÁRIOS (USERS) ================== */

import { createToast } from "./toastfy.js";


/* ----------------- BUSCAR INFORMAÇÕES DO FUNCIONÁRIO LOGADO ---------------- */
export const getUserInformation = async(token) => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/users/profile',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const request = await axios.request(options)
        // console.log(request.data)
        return request.data
    } catch (error) {
        console.error(error)
    }
    /* axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    }); */
}


/* ----------------- LISTAR TODOS OS FUNCIONÁRIOS DO MESMO DEPARTAMENTO ---------------- */
export const listUsersSameDepartment = (token) => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/users/departments/coworkers',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.request(options).then(function (response) {
        // console.log(response.data);
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
        url: 'http://localhost:6278/users/departments',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.request(options).then(function (response) {
        // console.log(response.data);
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
        url: 'http://localhost:6278/users',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        // data: { username: 'Kenzinho M2', password: '123456', email: 'kenzinhoM2@mail.com' }
        data: body
    };

    try {
        const request = await axios.request(options)
        console.log(request)
        return true

    } catch (error) {
        const response = error.response.data.error
        let message
        console.error(response)
        if (response == 'body empty') {
            message = 'Digite a informação a ser alterada!'
            createToast(message, false)
        }
    }
   /*  axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    }); */
}


/* ----------------- VERIFICAR O TIPO DE USUÁRIO (ADMIN/USER) ---------------- */
export const checkUserType = async(token) => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/auth/validate_user',
        headers: {
            Authorization: `Bearer ${token}` 
        }
    };
    try {
        const request = await axios.request(options)
        // console.log(request.data.is_admin)
        return request.data.is_admin
    } catch (error) {
        console.log(error)
    }
}