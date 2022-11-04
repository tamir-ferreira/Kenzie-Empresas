/* --------------- ABRIR E FECHAR MENU NO MOBILE --------------- */
export const toggleMenu = () => {
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')
    const openMenu = document.querySelector('#open-menu')
    const closeMenu = document.querySelector('#close-menu')

    openMenu.onclick = () => {
        main.classList.add('show-menu')
        nav.classList.add('show-menu')
        openMenu.classList.remove('show-menu')
        closeMenu.classList.add('show-menu')
    }

    closeMenu.onclick = () => {
        main.classList.remove('show-menu')
        nav.classList.remove('show-menu')
        openMenu.classList.add('show-menu')
        closeMenu.classList.remove('show-menu')
    }
}