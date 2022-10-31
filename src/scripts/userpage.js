import { getUserInformation } from "./employeesRequests.js"

const logout = () => {
    const btnLogout =  document.querySelector('#btn-logout')
    btnLogout.onclick = () =>{
        console.log('ok')
        localStorage.removeItem('@kenzieEmpresas-userId')
        window.location.replace('../../index.html')
    }
}


const renderUserInfo = async () => {
    const userInfo = document.querySelector('.user-info')
    const token = localStorage.getItem('@kenzieEmpresas-userId')
    const userData = await getUserInformation(token)
    console.log(userData)
    const { username, email, professional_level, kind_of_work } = userData

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
    logout()
}
renderUserInfo()