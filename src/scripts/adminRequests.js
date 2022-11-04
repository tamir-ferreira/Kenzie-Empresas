/* ================= ADMINISTRADOR ================== */


/* ----------------- LISTAR TODOS OS USUÁRIOS ---------------- */
export const listAllUsers = (token) => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/users',
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


/* ----------------- LISTAR USUÁRIOS SEM DEPARTAMENTO ---------------- */
export const listWithoutDepartment = (token) => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/admin/out_of_work',
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
export const updateUserInfoByAdmin = (token, id, body) => {
    const options = {
        method: 'PATCH',
        url: `http://localhost:6278/admin/update_user/${id}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    const request = axios.request(options).then(function (response) {
        // console.log(response.data);
        return response
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- DELETAR FUNCIONÁRIO ---------------- */
export const deleteUser = (token, id) => {
    const options = {
        method: 'DELETE',
        url: `http://localhost:6278/admin/delete_user/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.request(options).then(function (response) {
        return response
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- CADASTRAR EMPRESA ------------------- */
const registerCompany = () => {
    const options = {
        method: 'POST',
        url: 'http://localhost:6278/companies',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        },
        data: {
            name: 'Kenzie',
            opening_hours: '09:00',
            description: 'Kenzie kenzie kenzie',
            sector_uuid: '3854e74a-0a96-43dd-b44b-f884c08ff3a1'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ================= DEPARTAMENTOS ================= */

/* ----------------- LISTAR TODOS OS DEPARTAMENTOS -------------------*/
export const listAllDepartments = (token) => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/departments',
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


/* ----------------- LISTAR TODOS OS DEPARTAMENTOS DE UM EMPRESA  ESPECÍFICA -------------------*/

/* VERIFICAR SE PRECISA OU NÃO USAR */
export const listAllDepartmentsByCompany = (token, companyID) => {
    const options = {
        method: 'GET',
        url: `http://localhost:6278/departments/${companyID}`,
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


/* ----------------- CRIAR DEPARTAMENTO -------------------*/
export const createDepartment = (token, body) => {
    const options = {
        method: 'POST',
        url: 'http://localhost:6278/departments',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    const request = axios.request(options).then(function (response) {
        // console.log(response.data);
        return response
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- CONTRATAR FUNCIONÁRIO -------------------*/
export const hireEmployee = (token, body) => {
    const options = {
        method: 'PATCH',
        url: 'http://localhost:6278/departments/hire/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        /* data: {
            user_uuid: '18c1e797-420e-414c-a521-a78c71e4d4d5',
            department_uuid: 'e66f05d9-6093-4e32-9f70-4bcc213e53a5'
        } */
        data: body
    };

    const request = axios.request(options).then(function (response) {
        console.log(response.data);
        return response
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- DEMITIR FUNCIONÁRIO -------------------*/
export const dismissEmployee = (token, id) => {
    const options = {
        method: 'PATCH',
        url: `http://localhost:6278/departments/dismiss/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.request(options).then(function (response) {
        console.log(response.data);
        return response
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- EDITAR DEPARTAMENTO -------------------*/
export const editDepartment = (token, id, body) => {
    const options = {
        method: 'PATCH',
        url: `http://localhost:6278/departments/${id}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: body
    };

    const request = axios.request(options).then(function (response) {
        // console.log(response.data);
        return response
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- DELETAR DEPARTAMENTO -------------------*/
export const deleteDepartment = (token, id) => {
    const options = {
        method: 'DELETE',
        url: `http://localhost:6278/departments/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.request(options).then(function (response) {
        // console.log(response.data);
        return response
    }).catch(function (error) {
        console.error(error);
    });
    return request
}
