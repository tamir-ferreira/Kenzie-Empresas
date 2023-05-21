import { checkUserType } from "./employeesrequests.js"
import { toggleMenu } from "./menumobile.js"
import { login } from "./tokenlessrequests.js"


toggleMenu()

/* --------------- VERIFICA E AUTENTICA USUÁRIOS --------------- */
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

        if (response === 'OK') {
            const token = localStorage.getItem('@kenzieEmpresas-userId')
            const isAdmin = await checkUserType(token)

            if (isAdmin) window.location.replace('../pages/adminpage.html')
            else window.location.replace('../pages/userpage.html')

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