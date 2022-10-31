import { createToast } from "./toastfy.js"
import { createUser } from "./tokenlessRequests.js"
// import axios from "axios";


const eventRegister = () => {
    const form = document.querySelector('form')
    form.onsubmit = async (event) => {
        event.preventDefault()
        // console.dir(event.target)
        const [...formElements] = event.target
        const body = {}

        formElements.forEach(element => {
            // console.dir(element)
            if (element.tagName == "INPUT" || element.tagName == "SELECT") {
                body[element.name] = element.value
            }
        });

        const response = await createUser(body)
        console.log(response)

        if (response.statusText == 'Created') {
            window.location.replace('../pages/login.html')
        } else {
            response.response.data.error.forEach(error => {
                if (error == 'insert a valid email!') {
                    const output = 'Insira um email válido!'
                    console.log(output)
                    createToast('Insira um email válido!')
                }
                if (error == 'email alread exists!') {
                    console.log('erro email duplicado')
                    createToast('Email já existe!')
                }
            });

            formElements[1].style.borderColor = "var(--color-alert)"
        }
        formElements[1].onkeyup = () => {
            const toast = document.querySelector('.toast-error')
            if (toast != null) {
                toast.remove()
                formElements[1].style.borderColor = "var(--border-2)"
            }
        }
        // console.log(body)
    }



}
eventRegister()