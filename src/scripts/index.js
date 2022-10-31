import { getAllCompanys, getAllSectors, getCompanysBySector } from "./tokenlessRequests.js"


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


const renderCompanys = async (companies) => {
    const list = document.querySelector('section > ul')
    // const companies = await getAllCompanys()
    list.innerHTML = ''

    companies.forEach(company => {
        const { name, opening_hours } = company
        const { description } = company.sectors
        // console.log(company)
        list.insertAdjacentHTML('beforeend',
            `<li>
                <h4>${name}</h4>
                <p>${opening_hours} horas</p>
                <span>${description}</span>
            </li>
            `
        )
    });
    // renderSelect()
}
renderCompanys(await getAllCompanys())
