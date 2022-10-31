/* ================= FUNCIONÁRIOS (USERS) ================== */


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
const listUsersSameDepartment = () => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/users/departments/coworkers',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWEyMDJkYTQtZjE0Yi00NDE4LThmZmQtYTRjN2FiM2MxMTQ1IiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY5NjE2MDQsImV4cCI6MTY2NzgyNTYwNCwic3ViIjoiW29iamVjdCBVbmRlZmluZWRdIn0.xY83FhJMTkMETeIbdJedQMFDtEEEXRe3Cb6R28iUY7s'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- LISTAR OS DEPARTAMENTOS DA EMPRESA DO FUNCIONÁRIO LOGADO ---------------- */
const listCompanyDepartments = () => {
    const options = {
        method: 'GET',
        url: 'http://localhost:6278/users/departments',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWEyMDJkYTQtZjE0Yi00NDE4LThmZmQtYTRjN2FiM2MxMTQ1IiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY5NjE2MDQsImV4cCI6MTY2NzgyNTYwNCwic3ViIjoiW29iamVjdCBVbmRlZmluZWRdIn0.xY83FhJMTkMETeIbdJedQMFDtEEEXRe3Cb6R28iUY7s'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- ATUALIZAR INFORMAÇÕES DO FUNCIONÁRIO ---------------- */
const updateUserInfo = () => {
    const options = {
        method: 'PATCH',
        url: 'http://localhost:6278/users',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWEyMDJkYTQtZjE0Yi00NDE4LThmZmQtYTRjN2FiM2MxMTQ1IiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY5NjE2MDQsImV4cCI6MTY2NzgyNTYwNCwic3ViIjoiW29iamVjdCBVbmRlZmluZWRdIn0.xY83FhJMTkMETeIbdJedQMFDtEEEXRe3Cb6R28iUY7s'
        },
        data: { username: 'Kenzinho M2', password: '123456', email: 'kenzinhoM2@mail.com' }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
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
        console.log(request.data.is_admin)
        return request.data.is_admin
    } catch (error) {
        
    }
    /* axios.request(options).then(function (response) {
        console.log(response.data.is_admin);
        return response.data
    }).catch(function (error) {
        console.error(error);
    }); */
}