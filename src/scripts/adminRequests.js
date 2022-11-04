import { sendToast } from "./employeesRequests.js";

/* ================= ADMINISTRADOR ================== */
const urlBase = 'http://localhost:6278'

/* ----------------- LISTAR TODOS OS USUÁRIOS ---------------- */
export const listAllUsers = (token) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/users`,
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


/* ----------------- LISTAR USUÁRIOS SEM DEPARTAMENTO ---------------- */
export const listWithoutDepartment = (token) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/admin/out_of_work`,
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
export const updateUserInfoByAdmin = async (token, id, body) => {
    const options = {
        method: 'PATCH',
        url: `${urlBase}/admin/update_user/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    const request = await axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        if (error.response.statusText == 'Bad Request') {
            const message = 'Selecione a informação a ser atualizada'
            sendToast(message, false)
        }
        console.error(error);
    });

    if (request.statusText == 'OK') {
        const message = 'Informação atualizada com sucesso!'
        sendToast(message, true)
    }
    return request
}


/* ----------------- DELETAR FUNCIONÁRIO ---------------- */
export const deleteUser = async (token, id) => {
    const options = {
        method: 'DELETE',
        url: `${urlBase}/admin/delete_user/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = await axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        console.error(error);
    });

    if (request.statusText == 'No Content') {
        const message = 'Usuário deletado com sucesso!'
        sendToast(message, true)
    }
    return request
}


/* ================= DEPARTAMENTOS ================= */

/* ----------------- LISTAR TODOS OS DEPARTAMENTOS -------------------*/
export const listAllDepartments = (token) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/departments`,
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


/* ----------------- LISTAR TODOS OS DEPARTAMENTOS DE UM EMPRESA  ESPECÍFICA -------------------*/
export const listAllDepartmentsByCompany = (token, companyID) => {
    const options = {
        method: 'GET',
        url: `${urlBase}/departments/${companyID}`,
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


/* ----------------- CRIAR DEPARTAMENTO -------------------*/
export const createDepartment = async (token, body) => {
    const options = {
        method: 'POST',
        url: `${urlBase}/departments`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    const request = await axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        console.error(error);
    });
    console.log(request)
    if (request.statusText == 'Created') {
        const message = 'Departamento criado com sucesso!'
        sendToast(message, true)
    }
    return request
}


/* ----------------- CONTRATAR FUNCIONÁRIO -------------------*/
export const hireEmployee = async (token, body) => {
    const options = {
        method: 'PATCH',
        url: `${urlBase}/departments/hire/`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    const request = await axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        console.error(error);
    });

    if (request.statusText == 'OK') {
        const message = 'Funcionário contratado com sucesso!'
        sendToast(message, true)
    }
    return request
}


/* ----------------- DEMITIR FUNCIONÁRIO -------------------*/
export const dismissEmployee = async (token, id) => {
    const options = {
        method: 'PATCH',
        url: `${urlBase}/departments/dismiss/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = await axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        console.error(error);
    });

    if (request.statusText == 'OK') {
        const message = 'Funcionário desligado com sucesso!'
        sendToast(message, true)
    }
    return request
}


/* ----------------- EDITAR DEPARTAMENTO -------------------*/
export const editDepartment = async (token, id, body) => {
    const options = {
        method: 'PATCH',
        url: `${urlBase}/departments/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    const request = await axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        console.error(error);
    });

    if (request.statusText == 'OK') {
        const message = 'Informação atualizada com sucesso!'
        sendToast(message, true)
    }
    return request
}


/* ----------------- DELETAR DEPARTAMENTO -------------------*/
export const deleteDepartment = async (token, id) => {
    const options = {
        method: 'DELETE',
        url: `${urlBase}/departments/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = await axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        console.error(error);
    });

    if (request.statusText == 'No Content') {
        const message = 'Departamento deletado com sucesso!'
        sendToast(message, true)
    }
    return request
}
