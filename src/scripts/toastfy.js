export const createToast = (content, isOk) => {
    const body = document.querySelector('body')
    const div = document.createElement('div')
    const h4 = document.createElement('h4')

    div.className = 'toast'
    if (isOk) {
        div.classList.add('toast-ok')
    } else {
        div.classList.add('toast-error')
    }
    h4.innerText = content
    body.appendChild(div)
    div.appendChild(h4)

}