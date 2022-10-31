import { getAllCompanys } from "./tokenlessRequests.js"


const renderAllCompanys = async (companies) => {
    const list = document.querySelector('section > ul')
    // const companies = await getAllCompanys()
    list.innerHTML = ''

    companies.forEach(company => {
        const { name, opening_hours } = company
        const { description } = company.sectors
        console.log(company)
        list.insertAdjacentHTML('beforeend',
            `<li>
                <h4>${name}</h4>
                <p>${opening_hours} horas</p>
                <span>${description}</span>
            </li>
            `
        )
    });
}
renderAllCompanys(await getAllCompanys())
