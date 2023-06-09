
import { toggleMenu } from "./menuMobile.js"
import { createUser } from "./tokenlessRequests.js"

toggleMenu()


/* --------------- REGISTRA NOVO USUÁRIO --------------- */
const eventRegister = () => {
    const form = document.querySelector('form')
    form.onsubmit = async (event) => {
        event.preventDefault()

        const [...formElements] = event.target
        const body = {}

        formElements.forEach(element => {

            if (element.tagName == "INPUT" || element.tagName == "SELECT") {
                body[element.name] = element.value
            }
        });

        const response = await createUser(body)
        if (response) {
            setTimeout(() => {
                window.location.replace('../pages/login.html')
            }, 5000);

        } else {
            formElements[1].style.borderColor = "var(--color-alert)"
        }

        formElements[1].onkeyup = () => {
            const toast = document.querySelector('.toast-error')
            if (toast != null) {
                toast.remove()
                formElements[1].style.borderColor = "var(--border-2)"
            }
        }
    }
}
eventRegister()