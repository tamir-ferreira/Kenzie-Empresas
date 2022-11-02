import { listAllDepartments, listAllDepartmentsByCompany, listAllUsers } from "./adminRequests.js"
import { getAllCompanys } from "./tokenlessRequests.js"
const token = localStorage.getItem('@kenzieEmpresas-userId')

export const logout = () => {
    const btnLogout = document.querySelector('#btn-logout')
    btnLogout.onclick = () => {
        localStorage.removeItem('@kenzieEmpresas-userId')
        window.location.replace('./login.html')
    }
}


const renderSelect = async () => {
    const select = document.querySelector('#companies')
    const allCompanies = await getAllCompanys()
    let option = document.createElement('option')

    // console.log(allCompanies)

    select.innerHTML = ''
    select.appendChild(option)
    option.innerText = 'Selecionar Empresa'
    option.value = ''

    allCompanies.forEach(company => {
        const {name, uuid} = company
        // console.log(name)
        select.append(option)
        option = document.createElement('option')
        option.innerText = name
        option.value = uuid
    })

    select.onchange = async () => {
        console.log(select.value)
        const filteredDepartments = await listAllDepartmentsByCompany(token,select.value)
        console.log(filteredDepartments)

        await renderDepartments(filteredDepartments)
    }

    logout()
}
renderSelect()


const renderDepartments = async (departments) => {
    const list = document.querySelector('.list-departments')
    // const companies = await getAllCompanys()
    list.innerHTML = ''

    departments.forEach(department => {
        // console.log(department)
        const { name, description, } = department
        // const { companies } = department.companies.name
 
        // console.log(companies)
        list.insertAdjacentHTML('beforeend',
            `<li>
                <h4>${name}</h4>
                <span>${description}</span>
                <span>${department.companies.name}</span>
                <div>
                    <button>
                        <img src="../images/eye.svg" alt="ícone de um olho">
                    </button>
                    <button>
                        <img src="../images/edit-black.svg" alt="ícone de um lápis">
                    </button>
                    <button>
                        <img src="../images/trash.svg" alt="ícone de uma lixeira">
                    </button>
                </div>
            </li>
            `
        )
    });
    // renderSelect()
}
renderDepartments(await listAllDepartments(token))


const renderEmployees = async (employees) => {
    const list = document.querySelector('.list-employees')
    // const companies = await getAllCompanys()
    list.innerHTML = ''

    employees.forEach(employee => {
        console.log(employee)
        const { username, professional_level} = employee
        // const { companies } = department.companies.name
 
        // console.log(companies)
        list.insertAdjacentHTML('beforeend',
            `<li>
                <h4>${username}</h4>
                <span>${professional_level}</span>
                <span>Company Name</span>
                <div>
                    <button>
                        <img src="../images/edit-brand.svg" alt="ícone de um lápis">
                    </button>
                    <button>
                        <img src="../images/trash.svg" alt="ícone de uma lixeira">
                    </button>
                </div>
            </li>
            `
        )
    });
    // renderSelect()
}
renderEmployees(await listAllUsers(token))
