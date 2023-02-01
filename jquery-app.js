let $rows = $('tr[data-bs-toggle="popover"]')

function popoverInfo() {
    //capture information from table
    let [name, variety, link, cells] = $(this).children()
    let imageName = variety.outerText.slice(0,6)
    $(this).attr("data-bs-title",`${name.outerText} - ${variety.outerText}`)

    return `
    <div class="container m-2 d-flex flex-column">
    <img src='images/popover/${imageName}.jpg'><br>
    <p>Sourced from: ${link.outerText}<br>${cells.outerText} cells planted</p>
    </div>
    `
}

$($rows).attr({
            "data-bs-trigger": "hover",
            "data-bs-delay": '{ "show": 750, "hide": 150 }',
            "data-bs-placement": "auto",
            "data-bs-html": true,
            "data-bs-content": popoverInfo,
        })

let $selectedRow;
let $selectedPlant;

$('.delete-this').click((e)=>{
    $selectedRow = e.target.closest('tr')
    let [plant, variety] = $($selectedRow).children()
    $selectedPlant = `${plant.outerText} - ${variety.outerText}`
})

$(".confirm-delete").click(()=>{
    $selectedRow.remove()
    let toInsert = `<div class="alert alert-danger alert-dismissible" id="delete-alert" role="alert">
    <h5 class="lead">${$selectedPlant} deleted!</h5>
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  </div>`
    $(toInsert).insertBefore("table")
})

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

