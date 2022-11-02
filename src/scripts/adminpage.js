import { createDepartment, deleteDepartment, deleteUser, editDepartment, listAllDepartments, listAllDepartmentsByCompany, listAllUsers, updateUserInfoByAdmin } from "./adminRequests.js"
import { modalCreateDepartment, modalDeleteDepartment, modalDeleteEmployees, modalEditDepartment, modalEditEmployee, modalViewDepartment } from "./modal.js"
import { getAllCompanys } from "./tokenlessRequests.js"
const token = localStorage.getItem('@kenzieEmpresas-userId')

const logout = () => {
    const btnLogout = document.querySelector('#btn-logout')
    btnLogout.onclick = () => {
        localStorage.removeItem('@kenzieEmpresas-userId')
        window.location.replace('./login.html')
    }
}


const closeModal = () => {
    const modal = document.querySelector('.modal-container')
    const btnClose = document.querySelector('#btn-close')

    btnClose.onclick = () => {
        // console.log('click')
        modal.remove()
    }
}


const eventDeleteEmployee = () => {
    const btnsDelete = document.querySelectorAll('[data-delete-users-id]')

    btnsDelete.forEach(button => {
        button.onclick = () => {
            // console.log('ok')
            const id = button.getAttribute('data-delete-users-id')
            const name = button.getAttribute('data-delete-name')

            modalDeleteEmployees(name)

            console.log(id)
            const btnConfirm = document.querySelector('#btn-confirm')
            btnConfirm.onclick = async() =>{
                // console.log('ok')
                const response = await deleteUser(token, id)
                // console.log(response)
                if (response.statusText == "No Content") {
                    reloadEmployees()
                }
            }

            closeModal()
        }
    });
}


const eventEditEmployees = () => {
    const btnsEdit = document.querySelectorAll('[data-edit-users-id]')

    btnsEdit.forEach(button => {
        button.onclick = () => {
            const id = button.getAttribute('data-edit-users-id')

            modalEditEmployee()
            const form = document.querySelector('form')
            const [...formElements] = form
            // console.log(form)
            const body = {}
            form.onsubmit = async (event) => {
                event.preventDefault()

                formElements.forEach(element => {
                    // console.log(element);
                    if (element.tagName == 'SELECT' && element.value != '') {
                        body[element.name] = element.value
                    }
                });
                
                const response = await updateUserInfoByAdmin(token, id, body)
                if (response.statusText == 'OK') {
                    // console.log(response)
                    reloadEmployees()
                }
            }

            closeModal()
        }
    });
}


const eventViewDepartment = (departments) => {
    // const viewModal = document.querySelector('#view-modal')
    const btnsView = document.querySelectorAll('[data-view]')
    // console.log(btnsView)

    btnsView.forEach(button => {
        const id = button.getAttribute('data-view')

        button.onclick = () => {
            // const modal = document.querySelector('.modal-container')
            const listEmployees = document.querySelector('list-employees-department')

            const departmentSelected = departments.filter(
                department => department.uuid == id
            )

            // console.log(departmentSelected)
            modalViewDepartment(departmentSelected)

            closeModal()
        }
    });
}


const eventDeleteDepartment = () => {
    const btnsDelete = document.querySelectorAll('[data-delete-department]')


    btnsDelete.forEach(button => {
        button.onclick = () => {
            // console.log('ok')
            // console.log(button)
            const id = button.getAttribute('data-delete-department')
            const name = button.getAttribute('data-delete-name')
            // console.log(name)
            modalDeleteDepartment(name)

            const btnConfirm = document.querySelector('#btn-confirm')
            btnConfirm.onclick = async () => {
                const response = await deleteDepartment(token, id)
                // console.log(response)
                if (response.statusText == 'No Content') {
                    reloadDepartments()
                    /* FALTA DEMITIR OS FUNCIONÁRIOS */

                }
            }

            closeModal()
        }
    });
}


const eventEditDepartment = () => {
    const btnsEdit = document.querySelectorAll('[data-edit-description]')
    // console.log(btnsDepartment)
    btnsEdit.forEach(button => {
        button.onclick = () => {
            // console.log('ok')
            const id = button.getAttribute('data-edit-id')
            const description = button.getAttribute('data-edit-description')

            modalEditDepartment(description)

            const body = {}
            const btnEdit = document.querySelector('#btn-edit')

            btnEdit.onclick = async () => {
                body['description'] = document.querySelector('textarea').value
                // console.log(body)
                const response = await editDepartment(token, id, body)
                // console.log(response)
                if (response.statusText == 'OK') {
                    // document.location.reload(true);
                    reloadDepartments()
                }
            }
            closeModal()
        }
    });
}


const eventCreateDepartment = (companies) => {
    const btnCreate = document.querySelector('#create-department')
    btnCreate.onclick = () => {
        modalCreateDepartment(companies)
        const form = document.querySelector('form')
        const [...formElements] = form
        const body = {}

        // console.log(companies)
        form.onsubmit = async (event) => {
            event.preventDefault()

            formElements.forEach(element => {
                if (element.tagName == 'SELECT') {
                    const select = companies.find(company => element.value == company.name)
                    body[element.name] = select.uuid
                    // console.log(select)
                }


                if (element.tagName == 'INPUT') {
                    body[element.name] = element.value
                }
            });
            // console.log(body)
            const response = await createDepartment(token, body)
            if (response.statusText == 'Created') {
                // document.location.reload(true);
                reloadDepartments()
            }

        }
        closeModal()
    }
}

const reloadDepartments = async () => {
    renderDepartments(await listAllDepartments(token))
    document.querySelector('.modal-container').remove()

}
const reloadEmployees = async () => {
    // console.log('reload')
    renderEmployees(await listAllUsers(token))
    document.querySelector('.modal-container').remove()
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
        const { name, uuid } = company
        // console.log(name)
        select.append(option)
        option = document.createElement('option')
        option.innerText = name
        option.value = uuid
    })

    select.onchange = async () => {
        console.log(select.value)
        const filteredDepartments = await listAllDepartmentsByCompany(token, select.value)
        // console.log(filteredDepartments)

        await renderDepartments(filteredDepartments)
    }

    eventCreateDepartment(allCompanies)
    logout()
}
renderSelect()


const renderDepartments = async (departments) => {
    const list = document.querySelector('.list-departments')
    // const companies = await getAllCompanys()
    list.innerHTML = ''

    // console.log(departments)

    departments.forEach(department => {
        // console.log(department)
        const { name, description, uuid } = department
        // const { companies } = department.companies.name

        // console.log(uuid)
        list.insertAdjacentHTML('beforeend',
            `<li>
                <h4>${name}</h4>
                <span>${description}</span>
                <span>${department.companies.name}</span>
                <div>
                    <button data-view='${uuid}'>
                        <img src="../images/eye.svg" alt="ícone de um olho">
                    </button>
                    <button data-edit-id=${uuid} data-edit-description='${description}'>
                        <img src="../images/edit-black.svg" alt="ícone de um lápis">
                    </button>
                    <button data-delete-department='${uuid}' data-delete-name='${name}'>
                        <img src="../images/trash.svg" alt="ícone de uma lixeira">
                    </button>
                </div>
            </li>
            `
        )
    });
    eventViewDepartment(departments)
    eventEditDepartment()
    eventDeleteDepartment()
}
renderDepartments(await listAllDepartments(token))


const renderEmployees = async (employees) => {
    const list = document.querySelector('.list-employees')
    // const companies = await getAllCompanys()
    list.innerHTML = ''

    employees.forEach(employee => {
        // console.log(employee)
        const { username, professional_level, uuid } = employee
        // const { companies } = department.companies.name

        // console.log(companies)
        list.insertAdjacentHTML('beforeend',
            `<li>
                <h4>${username}</h4>
                <span>${professional_level || "nível não informado"}</span>
                <span>Company Name</span>
                <div>
                    <button data-edit-users-id=${uuid}>
                        <img src="../images/edit-brand.svg" alt="ícone de um lápis">
                    </button>
                    <button data-delete-users-id=${uuid} data-delete-name=${username}>
                        <img src="../images/trash.svg" alt="ícone de uma lixeira">
                    </button>
                </div>
            </li>
            `
        )
    });
    eventEditEmployees()
    eventDeleteEmployee()
}
renderEmployees(await listAllUsers(token))
