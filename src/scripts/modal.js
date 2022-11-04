import { renderEmployeesByDepartment } from "./adminPage.js"

const modalContainer = () => {
    const body = document.querySelector('body')
    const divContainer = document.createElement('div')
    const divModal = document.createElement('div')
    const button = document.createElement('button')
    const img = document.createElement('img')

    divContainer.className = 'modal-container'
    button.id = 'btn-close'
    img.src = '../images/close.svg'
    img.alt = 'botão fechar janela do modal'

    body.appendChild(divContainer)
    divContainer.appendChild(divModal)
    divModal.append(button)
    button.appendChild(img)

    const content = document.querySelector('.modal-container > div')
    return content
}

export const modalDeleteDepartment = (department) => {
    const content = modalContainer()

    content.classList.add('modal-confirmation')

    content.insertAdjacentHTML('afterbegin',
        `<h3>Realmente deseja deletar o Departamento ${department} e demitir seus funcionários?</h3>
         <button id="btn-confirm" class="btn-success">Confirmar</button>
        `
    )
}


export const modalCreateDepartment = (companies, companySelected) => {
    const content = modalContainer()

    content.insertAdjacentHTML('afterbegin',
        `<h2>Criar Departamento</h2>
        <form action="">
            <input name="name" type="text" placeholder="Nome do departamento" required>
            <input name="description" type="text" placeholder="Descrição" required>
            <select name="company_uuid" id="companies-modal" required>
                <option value=''>Selecionar Empresa</option>
            </select>
            <button class="btn-brand">Criar departamento</button>
        </form>
        `
    )

    const select = document.querySelector('#companies-modal')

    companies.forEach(company => {
        const option = document.createElement('option')
        option.innerText = company.name
        option.value = company.name
        select.appendChild(option)
    });

    if (companySelected != null) select.value = companySelected
}

export const modalEditDepartment = (description) => {
    const content = modalContainer()

    content.insertAdjacentHTML('afterbegin',
        `<h2>Editar Departamento</h2>
        <form action="">
            <textarea name="" id="" cols="30" rows="3"></textarea>
            <button type='button' id="btn-edit" class="btn-brand">Salvar alterações</button>
        </form>
        `
    )
    document.querySelector('textarea').value = description
}


export const modalDeleteEmployees = (employee) => {
    const content = modalContainer()

    content.classList.add('modal-confirmation')

    content.insertAdjacentHTML('afterbegin',
        `<h3>Realmente deseja remover o usuário ${employee}?</h3>
         <button type="button" id="btn-confirm" class="btn-success">Confirmar</button>
        `
    )
}


export const modalEditEmployee = () => {
    const content = modalContainer()

    content.insertAdjacentHTML('afterbegin',
        `<h2>Editar Usuário</h2>
        <form action="">
            <select name="kind_of_work">
            <option value=''>Selecionar modalidade de trabalho</option>
            <option value='home office'>Home Office</option>
            <option value='presencial'>Presencial</option>
            <option value='hibrido'>Híbrido</option>
            </select>
            <select name="professional_level">
            <option value=''>Selecionar nível profissional</option>
            <option value='estágio'>Estágio</option>
            <option value='júnior'>Júnior</option>
            <option value='pleno'>Pleno</option>
            <option value='sênior'>Sênior</option>
            </select>
            <button class="btn-brand">Salvar alterações</button>
        </form>
        `
    )
}


export const modalViewDepartment = (departmentSelected, employeesOutOfWork, employees) => {

    const content = modalContainer()
    const { name, description, uuid } = departmentSelected[0]
    const { name: company } = departmentSelected[0].companies
    content.className = 'modal-departments'

    content.insertAdjacentHTML('afterbegin',
        `<h2>${name}</h2>
        <div>
            <div>
                <h4>${description}</h4>
                <span>${company}</span>
            </div>
            <form>
                <select name="user_uuid" id="out-of-work">
                    <option value="">Selecionar usuário</option>
                </select>
                <button id="btn-hire" class="btn-success">Contratar</button>
            </form>
        </div>
        <ul class="list-employees-department">
        </ul>
        `
    )

    const select = document.querySelector('#out-of-work')

    employeesOutOfWork.forEach(employee => {
        const option = document.createElement('option')
        option.innerText = employee.username
        option.value = employee.uuid

        select.appendChild(option)
    })

    renderEmployeesByDepartment(employees, uuid, company)
}