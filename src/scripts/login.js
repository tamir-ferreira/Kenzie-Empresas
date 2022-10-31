import { checkUserType } from "./employeesRequests.js"
import { login } from "./tokenlessRequests.js"

const eventLogin = () => {
    const form = document.querySelector('form')

    form.onsubmit = async (event) => {
        event.preventDefault()
        const [...formElements] = event.target
        const body = {}

        formElements.forEach(element => {
            if (element.tagName == 'INPUT') body[element.name] = element.value
        });

        const response = await login(body)
        // console.log(response)

        if (response === 'OK') {
            console.log(`ok`)
            const token = localStorage.getItem('@kenzieEmpresas-userId')
            const isAdmin = await checkUserType(token)
            console.log(isAdmin)
            if (isAdmin) {
                window.location.replace('../pages/adminPage.html')
            } else {
                window.location.replace('../pages/userPage.html')
            }

        } else {
            if (response === 'email') formElements[0].style.borderColor = "var(--color-alert)"
            else formElements[1].style.borderColor = "var(--color-alert)"
        }

        formElements.forEach(element => {
            element.onkeyup = () => {
                const toast = document.querySelector('.toast')
                if (toast != null) {
                    toast.remove()
                    formElements[0].style.borderColor = "var(--border-2)"
                    formElements[1].style.borderColor = "var(--border-2)"
                }
            }
        })
    }

}

eventLogin()