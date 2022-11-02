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
        console.log(response.data);
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- LISTAR USUÁRIOS SEM DEPARTAMENTO ---------------- */
const listWithoutDepartment = () => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/admin/out_of_work',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- ATUALIZAR INFORMAÇÕES DO FUNCIONÁRIO ---------------- */
const updateUserInfoByAdmin = () => {
    const options = {
        method: 'PATCH',
        url: 'http://localhost:6278/admin/update_user/5a202da4-f14b-4418-8ffd-a4c7ab3c1145',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        },
        data: { kind_of_work: 'presencial', professional_level: 'pleno' }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- DELETAR FUNCIONÁRIO ---------------- */
const deleteUser = () => {
    const options = {
        method: 'DELETE',
        url: 'http://localhost:6278/admin/delete_user/5a202da4-f14b-4418-8ffd-a4c7ab3c1145',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
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
        console.log(response.data);
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
    return request
}


/* ----------------- CRIAR DEPARTAMENTO -------------------*/
const createDepartment = () => {
    const options = {
        method: 'POST',
        url: 'http://localhost:6278/departments',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        },
        data: {
            name: 'Ensino',
            description: 'Equipe responsável para ensinar os alunos',
            company_uuid: '85b7393b-ad59-4550-964b-0aaf796243f1'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- CONTRATAR FUNCIONÁRIO -------------------*/
const hireEmployee = () => {
    const options = {
        method: 'PATCH',
        url: 'http://localhost:6278/departments/hire/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        },
        data: {
            user_uuid: '18c1e797-420e-414c-a521-a78c71e4d4d5',
            department_uuid: 'e66f05d9-6093-4e32-9f70-4bcc213e53a5'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- DISPENSAR FUNCIONÁRIO -------------------*/
const dismissEmployee = () => {
    const options = {
        method: 'PATCH',
        url: 'http://localhost:6278/departments/dismiss/18c1e797-420e-414c-a521-a78c71e4d4d5',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- EDITAR DEPARTAMENTO -------------------*/
const editDepartment = () => {
    const options = {
        method: 'PATCH',
        url: 'http://localhost:6278/departments/e66f05d9-6093-4e32-9f70-4bcc213e53a5',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA'
        },
        data: { description: 'Novo departamento de TI' }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- DELETAR DEPARTAMENTO -------------------*/
const deletDepartment = () => {
    const options = {
        method: 'DELETE',
        url: 'http://localhost:6278/departments/f38d1fd3-7add-4b09-8ea9-ab2424e25f93',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjdjOTc4Y2MtMzhhNi00NzMzLTk5YTYtZmVmYjkwZWJjNzEyIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2MjEyNDEzOCwiZXhwIjoxNjYyOTg4MTM4LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.m4vRB3gWfnCBcELPgqan-EfIgRehpvgtZvCP3PSuG4k'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}