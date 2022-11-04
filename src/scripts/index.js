import { toggleMenu } from "./menuMobile.js"
import { getAllCompanys, getAllSectors, getCompanysBySector } from "./tokenlessRequests.js"


toggleMenu()

/* --------------- RENDERIZA BOTÃO SELECIONAR SETOR --------------- */
const renderSelect = async () => {
    const select = document.querySelector('#sectors')
    const sectors = await getAllSectors()
    let option = document.createElement('option')

    select.innerHTML = ''
    select.appendChild(option)
    option.innerText = 'Selecionar Setor'
    option.value = ''

    sectors.forEach(sector => {
        select.append(option)
        option = document.createElement('option')
        option.innerText = sector.description
        option.value = sector.description
    })

    select.onchange = async () => {
        const filteredCompanys = await getCompanysBySector(select.value)
        await renderCompanys(filteredCompanys)
    }
}
renderSelect()


/* --------------- RENDERIZA LISTA DE EMPRESAS --------------- */
const renderCompanys = async (companies) => {
    const list = document.querySelector('section > ul')
    list.innerHTML = ''

    companies.forEach(company => {
        const { name, opening_hours } = company
        const { description } = company.sectors

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
renderCompanys(await getAllCompanys())
