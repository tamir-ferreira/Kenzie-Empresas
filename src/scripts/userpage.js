import { getUserInformation, updateUserInfo } from "./employeesRequests.js"

const logout = () => {
    const btnLogout = document.querySelector('#btn-logout')
    btnLogout.onclick = () => {
        localStorage.removeItem('@kenzieEmpresas-userId')
        window.location.replace('../../index.html')
    }
}

const editProfile = (profile) => {
    const token = localStorage.getItem('@kenzieEmpresas-userId')
    // const {username, email} = profile
    const form = document.querySelector('form')
    // console.log(profile)
    // form[0].value = username
    // form[1].value = email

    form.onsubmit = async (event) => {
        event.preventDefault()
        const [...formElements] = event.target
        const body = {}

        formElements.forEach(element => {
            // console.log(element)
            if (element.tagName == "INPUT" && element.value != '') {
                body[element.name] = element.value
            }
        })
        console.log(body)

        const response = await updateUserInfo(body, token)
        console.log(response)

        if (response) {
            document.location.reload(true)
        }
    }
}


const renderUserInfo = async () => {
    const userInfo = document.querySelector('.user-info')
    const token = localStorage.getItem('@kenzieEmpresas-userId')
    const profile = await getUserInformation(token)
    // console.log(userData)
    const { username, email, professional_level, kind_of_work } = profile

    userInfo.insertAdjacentHTML('afterbegin',
        `<div>
            <div>
                <h1>${username}</h1>
                <span>Email: ${email}</span>
            </div>
            <span>${professional_level || ''}</span>
            <span>${kind_of_work || ''}</span>
        </div>
        `
    )

    const btnEdit = document.querySelector('#btn-edit')
    const modal = document.querySelector('.modal-container')

    btnEdit.onclick = () => {
        modal.classList.add('show-modal')
        const btnClose = document.querySelector('#btn-close')
        btnClose.onclick = () => {
            modal.classList.remove('show-modal')
        }
        editProfile(profile)
    }
    logout()
}
renderUserInfo()