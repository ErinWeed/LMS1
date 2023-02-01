let $rows = $('tr[data-bs-toggle="popover"]')

$rows.each(function(){

    //capture information from table
    let [name, variety, link, cells] = $(this).children()
    let title = `${name.outerText} - ${variety.outerText}`
    let imageName = variety.outerText.slice(0,6)

    //insert info into popovers
    let toInsert = `
    <div class="container m-2 d-flex flex-column">
    <img src='images/popover/${imageName}.jpg'><br>
    <p>Sourced from: ${link.outerText}<br>${cells.outerText} cells planted</p>
    </div>
    `
    $(this).attr({"data-bs-trigger": "hover",
    "data-bs-delay": '{ "show": 750, "hide": 150 }',
    "data-bs-placement": "auto",
    "data-bs-html": true,
    "data-bs-content":toInsert,
    "data-bs-title": title})
})

let $selectedRow;
let $selectedPlant;

$('.delete-this').click((e)=>{
    $selectedRow = e.target.closest('tr')
    let $plant = $($selectedRow).children('th')
    let $variety = $($plant).next()
    $selectedPlant = `${$plant.text()} - ${$variety.text()}`
    console.log($selectedPlant)
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

