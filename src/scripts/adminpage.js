import { createDepartment, deleteDepartment, deleteUser, dismissEmployee, editDepartment, hireEmployee, listAllDepartments, listAllDepartmentsByCompany, listAllUsers, listWithoutDepartment, updateUserInfoByAdmin } from "./adminRequests.js"
import { checkUserType } from "./employeesRequests.js"
import { modalCreateDepartment, modalDeleteDepartment, modalDeleteEmployees, modalEditDepartment, modalEditEmployee, modalViewDepartment } from "./modal.js"
import { getAllCompanys } from "./tokenlessRequests.js"
const token = localStorage.getItem('@kenzieEmpresas-userId')


/* --------------- ENCERRAR A SESSÃO DO ADMIN --------------- */
const logout = () => {
    const btnLogout = document.querySelector('#btn-logout')
    btnLogout.onclick = (event) => {
        event.preventDefault()
        localStorage.removeItem('@kenzieEmpresas-userId')
        window.location.replace('../../index.html')
    }
}


/* --------------- FECHAR O MODAL ABERTO --------------- */
const closeModal = () => {
    const modal = document.querySelector('.modal-container')
    const btnClose = document.querySelector('#btn-close')

    btnClose.onclick = () => modal.remove()
}


/* --------------- DELETAR O USUÁRIO SELECIONADO --------------- */
const eventDeleteEmployee = () => {
    const btnsDelete = document.querySelectorAll('[data-delete-users-id]')

    btnsDelete.forEach(button => {
        button.onclick = () => {
            const id = button.getAttribute('data-delete-users-id')
            const name = button.getAttribute('data-delete-name')

            modalDeleteEmployees(name)

            const btnConfirm = document.querySelector('#btn-confirm')
            btnConfirm.onclick = async () => {
                const response = await deleteUser(token, id)
                if (response.statusText == "No Content") await reloadEmployees()
            }

            closeModal()
        }
    });
}


/* --------------- EDITAR CADASTRO DO FUNCIONÁRIO --------------- */
const eventEditEmployees = () => {
    const btnsEdit = document.querySelectorAll('[data-edit-users-id]')

    btnsEdit.forEach(button => {
        button.onclick = () => {
            const id = button.getAttribute('data-edit-users-id')

            modalEditEmployee()
            const form = document.querySelector('form')
            const [...formElements] = form
            const body = {}

            form.onsubmit = async (event) => {
                event.preventDefault()
                formElements.forEach(element => {
                    if (element.tagName == 'SELECT' && element.value != '') {
                        body[element.name] = element.value
                    }
                });

                const response = await updateUserInfoByAdmin(token, id, body)
                if (response.statusText == 'OK') await reloadEmployees()
            }

            closeModal()
        }
    });
}


/* --------------- VIZUALIZAR DEPARTAMENTO SELECIONADO --------------- */
const eventViewDepartment = (departments) => {
    const btnsView = document.querySelectorAll('[data-view]')

    btnsView.forEach(button => {
        const id = button.getAttribute('data-view')
        button.onclick = async () => {

            const departmentSelected = departments.filter(
                department => department.uuid == id
            )

            const outOfWork = await listWithoutDepartment(token)
            const employees = await listAllUsers(token)

            modalViewDepartment(departmentSelected, outOfWork, employees)

            const form = document.querySelector('form')
            const select = document.querySelector('#out-of-work')
            const body = {}

            form.onsubmit = async (event) => {
                event.preventDefault()
                body[select.name] = select.value
                body["department_uuid"] = departmentSelected[0].uuid

                const response = await hireEmployee(token, body)

                if (response.statusText == 'OK') reloadEmployees()
            }

            const btnsDismiss = document.querySelectorAll('[data-dismiss]')
            btnsDismiss.forEach(btn => {
                btn.onclick = async () => {
                    const id = btn.getAttribute('data-dismiss')
                    const response = await dismissEmployee(token, id)

                    if (response.statusText == 'OK') {
                        await reloadEmployees()
                        await reloadDepartments()
                    }
                }
            })

            closeModal()
        }
    });
}


/* --------------- DELETAR DEPARTAMENTO SELECIONADO --------------- */
const eventDeleteDepartment = () => {
    const btnsDelete = document.querySelectorAll('[data-delete-department]')
    btnsDelete.forEach(button => {
        button.onclick = async () => {
            const idDepartment = button.getAttribute('data-delete-department')
            const name = button.getAttribute('data-delete-name')
            const employees = await listAllUsers(token)

            modalDeleteDepartment(name)

            const btnConfirm = document.querySelector('#btn-confirm')
            btnConfirm.onclick = async () => {
                employees.forEach(employee => {
                    if (employee.department_uuid == idDepartment) {
                        dismissEmployee(token, employee.uuid)
                    }
                });

                const response = await deleteDepartment(token, idDepartment)

                if (response.statusText == 'No Content') {
                    await reloadEmployees()
                    await reloadDepartments()
                }
            }

            closeModal()
        }
    });
}


/* --------------- EDITAR INFORMAÇÕES DO DEPARTAMENTO SELECIONADO --------------- */
const eventEditDepartment = () => {
    const btnsEdit = document.querySelectorAll('[data-edit-description]')
    btnsEdit.forEach(button => {
        button.onclick = () => {
            const id = button.getAttribute('data-edit-id')
            const description = button.getAttribute('data-edit-description')

            modalEditDepartment(description)

            const body = {}
            const btnEdit = document.querySelector('#btn-edit')

            btnEdit.onclick = async () => {
                body['description'] = document.querySelector('textarea').value
                const response = await editDepartment(token, id, body)

                if (response.statusText == 'OK') await reloadDepartments()
            }

            closeModal()
        }
    });
}


/* --------------- CRIAR UM NOVO DEPARTAMENTO --------------- */
const eventCreateDepartment = (companies) => {
    const btnCreate = document.querySelector('#create-department')
    btnCreate.onclick = () => {
        const companySelected = document.querySelector('#companies')

        if (companySelected.value != '') {
            const findCompany = companies.find(company => company.uuid == companySelected.value)
            modalCreateDepartment(companies, findCompany.name)

        } else modalCreateDepartment(companies, null)

        const form = document.querySelector('form')
        const [...formElements] = form
        const body = {}

        form.onsubmit = async (event) => {
            event.preventDefault()

            formElements.forEach(element => {
                if (element.tagName == 'SELECT') {
                    const select = companies.find(company => element.value == company.name)
                    body[element.name] = select.uuid
                }

                if (element.tagName == 'INPUT') body[element.name] = element.value
            });

            const response = await createDepartment(token, body)
            if (response.statusText == 'Created') await reloadDepartments()
        }

        closeModal()
    }
}


/* --------------- ATUALIZAR A RENDERIZAÇÃO DOS DEPARTAMENTOS --------------- */
const reloadDepartments = async () => {
    const select = document.querySelector('#companies')
    if (select.value == '') {
        renderDepartments(await listAllDepartments(token))

    } else {
        const filteredDepartments = await listAllDepartmentsByCompany(token, select.value)
        await renderDepartments(filteredDepartments)
    }

    const modal = document.querySelector('.modal-container')
    if (modal != null) modal.remove()
}


/* --------------- ATUALIZAR A RENDERIZAÇÃO DOS FUNCIONÁRIOS --------------- */
const reloadEmployees = async () => {
    renderEmployees(await listAllUsers(token), await listAllDepartments(token))
    const modal = document.querySelector('.modal-container')
    if (modal != null) modal.remove()
}


/* --------------- RENDERIZAR DEPARTAMENTOS DA EMPRESA SELECIONADA --------------- */
const renderSelect = async () => {
    const select = document.querySelector('#companies')
    const allCompanies = await getAllCompanys()
    let option = document.createElement('option')

    select.innerHTML = ''
    select.appendChild(option)
    option.innerText = 'Selecionar Empresa'
    option.value = ''

    allCompanies.forEach(company => {
        const { name, uuid } = company
        select.append(option)
        option = document.createElement('option')
        option.innerText = name
        option.value = uuid
    })

    select.onchange = async () => reloadDepartments()

    eventCreateDepartment(allCompanies)
    logout()
}


/* --------------- RENDERIZAR OS DEPARTAMENTOS --------------- */
const renderDepartments = async (departments) => {
    const list = document.querySelector('.list-departments')
    list.innerHTML = ''

    departments.forEach(department => {
        const { name, description, uuid } = department

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


/* --------------- RENDERIZAR OS FUNCIONÁRIOS --------------- */
const renderEmployees = async (employees, departments) => {
    const list = document.querySelector('.list-employees')
    list.innerHTML = ''

    employees.forEach(employee => {
        const { username, professional_level, uuid, is_admin
        } = employee
        let company = 'não está contratado(a)'

        departments.forEach(department => {
            if (employee.department_uuid == department.uuid) {
                company = department.companies.name
            }
        });

        if (!is_admin) {
            list.insertAdjacentHTML('beforeend',
                `<li>
                <h4>${username}</h4>
                <span>${professional_level || "nível não informado"}</span>
                <span>${company}</span>
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
        }
    });
    eventEditEmployees()
    eventDeleteEmployee()
}


/* --------------- RENDERIZAR FUNCIONÁRIOS CONTRATADOS NO DEPARTAMENTO --------------- */
export const renderEmployeesByDepartment = (employees, uuid, company) => {
    const listEmployees = document.querySelector('.list-employees-department')

    listEmployees.innerHTML = ''
    employees.forEach(employee => {
        if (employee.department_uuid == uuid) {
            listEmployees.insertAdjacentHTML('beforeend',
                `<li>
                    <div>
                        <h4>${employee.username}</h4>
                        <span>${employee.professional_level}</span>
                        <span>${company}</span>
                    </div>
                    <button data-dismiss="${employee.uuid}" class="btn-alert">Desligar</button>
                </li>
                `
            )
        }
    })
}


/* --------------- VERIFICAR SE O USUÁRIO TEM AUTENTICAÇÃO DE ADMINISTRADOR -------------- */
const verifyPermission = async () => {
    if (token == '' || token == null) {
        window.location.replace('../../index.html')
    } else {
        const isAdmin = await checkUserType(token)

        if (!isAdmin) {
            window.location.replace('./userPage.html')
        } else {
            renderSelect()
            renderDepartments(await listAllDepartments(token))
            renderEmployees(await listAllUsers(token), await listAllDepartments(token))
        }
    }
}
verifyPermission()