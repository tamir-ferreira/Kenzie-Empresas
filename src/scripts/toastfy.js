export const createToast = (content) => {
    const body = document.querySelector('body')
    const div = document.createElement('div')
    const h4 = document.createElement('h4')

    div.className = 'toast-error'
    h4.innerText = content
    body.appendChild(div)
    div.appendChild(h4)

}