/* ================= ROTAS QUE NÃO UTILIZAM TOKEN ================== */
import axios from "axios";


/* ----------------- CRIAR USUÁRIO ---------------- */
const createUser = () => {
    const options = {
        method: 'POST',
        url: 'http://localhost:6278/auth/register',
        headers: { 'Content-Type': 'application/json' },
        data: {
            username: 'kezinho',
            password: '1234',
            email: 'kenzinho@mail.com',
            professional_level: 'sênior'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


/* ----------------- LOGIN ---------------- */
const login = () => {
    const options = {
        method: 'POST',
        url: 'http://localhost:6278/auth/login',
        headers: { 'Content-Type': 'application/json' },
        data: { email: 'kenzinhom2@mail.com', password: '123456' }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
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