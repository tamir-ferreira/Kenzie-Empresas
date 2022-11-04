import { checkUserType, getUserInformation, listCompanyDepartments, listUsersSameDepartment, updateUserInfo } from "./employeesRequests.js"
const token = localStorage.getItem('@kenzieEmpresas-userId')


export const logout = () => {
    const btnLogout = document.querySelector('#btn-logout')
    btnLogout.onclick = (event) => {
        event.preventDefault()
        localStorage.removeItem('@kenzieEmpresas-userId')
        window.location.replace('../../index.html')
    }
}


const editProfile = () => {
    const token = localStorage.getItem('@kenzieEmpresas-userId')
    const form = document.querySelector('form')

    form.onsubmit = async (event) => {
        event.preventDefault()
        const [...formElements] = event.target
        const body = {}

        formElements.forEach(element => {
            if (element.tagName == "INPUT" && element.value != '') {
                body[element.name] = element.value
            }
        })

        const response = await updateUserInfo(body, token)

        if (response) reloadUser()
    }
}

const reloadUser = async () => {
    renderUserInfo()
    document.querySelector('.modal-container').classList.toggle('hide-modal')
}

const renderUserInfo = async (profile) => {
    const userInfo = document.querySelector('.user-info >div')
    
    const { username, email, professional_level, kind_of_work } = profile
    userInfo.innerHTML = ''

    userInfo.insertAdjacentHTML('afterbegin',
        `
            <div>
                <h1>${username}</h1>
                <span>Email: ${email}</span>
            </div>
            <span>${professional_level || ''}</span>
            <span>${kind_of_work || ''}</span>
        
        `
    )

    const btnEdit = document.querySelector('#btn-edit')
    const modal = document.querySelector('.modal-container')

    btnEdit.onclick = () => {
        modal.classList.toggle('hide-modal')
        const btnClose = document.querySelector('#btn-close')
        btnClose.onclick = () => {
            modal.classList.toggle('hide-modal')
        }
        editProfile(profile)
    }

    if(profile.department_uuid != null){
        const emptContainer = document.querySelector('.empty-container')
        emptContainer.style.display = 'none'
        renderCoWorkers(profile)
    }   
    
    logout()
}


const renderCoWorkers = async(profile) =>{
    const company = await listCompanyDepartments(token)
    const coworkers = await listUsersSameDepartment(token)
    const {name} = company
    let departmentName = ''

    company.departments.forEach(department => {
        if (profile.department_uuid == department.uuid) {
            departmentName = department.name
        }
    })

    const listUsers = document.querySelector('.list-users')
    listUsers.innerText = ''
    const h2 = document.createElement('h2')
    const ul = document.createElement('ul')
    h2.innerText = `${name} - ${departmentName}`

    listUsers.appendChild(h2)

    coworkers[0].users.forEach(cowork => {
        if (profile.uuid != cowork.uuid ) {
            const li = document.createElement('li')
            const h4 = document.createElement('h4')
            const span = document.createElement('span')
            
            h4.innerText = cowork.username
            span.innerText = cowork.professional_level
            
            listUsers.appendChild(ul)
            ul.appendChild(li)
            li.append(h4, span)
        }
    });
}


/* --------------- VERIFICA SE O USUÁRIO ESTÁ LOGADO -------------- */
const verifyPermission = async() => {
    if (token == '' || token == null) {
        window.location.replace('../../index.html')
    } else {
        const isAdmin = await checkUserType(token)
        if (isAdmin) {
            window.location.replace('./adminPage.html')
        } else{
            if (isAdmin == undefined) {
                window.location.replace('../../index.html') 
            } else{
                const profile = await getUserInformation(token)
                renderUserInfo(profile)
            }
        }
    }
}
verifyPermission()