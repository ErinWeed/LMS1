let selectedRow;
let selectedPlant;

const rows = document.querySelectorAll("tr")

for (let row of rows) {
    //capture information from table
    let plantName = row.children[0].innerText
    let variety = row.children[1].innerText
    let curTitle = ` ${plantName} - ${variety} `
    let curImageName = `${row.children[1].innerText.slice(0,6)}`
    let curLinkName = ` ${row.children[2].innerText} `
    let curCellNumber = ` ${row.children[3].innerText} `

    //insert info into popovers
    row.setAttribute("data-bs-content",`
    <div class="container m-2 d-flex flex-column">
    <img src='images/popover/${curImageName}.jpg'><br>
    <p>Sourced from: ${curLinkName}<br>${curCellNumber} cells planted</p>
    </div>`
    )
    row.setAttribute("data-bs-title", curTitle)

    //add event listener for delete button
    row.addEventListener("click",(e)=>{
        if (e.target.parentElement.classList.contains("delete-this") ) {
            selectedRow = row
            selectedPlant = curTitle
            document.querySelector('.delete-plant-name').innerText = selectedPlant
        }
    })
}

const confirmDelete = document.querySelector(".confirm-delete")
confirmDelete.addEventListener("click",()=>{
    selectedRow.remove()
    let toInsert = `<div class="alert alert-danger alert-dismissible" id="delete-alert" role="alert">
    <h5 class="lead">${selectedPlant} deleted!</h5>
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  </div>`
    document.querySelector("table").insertAdjacentHTML("beforebegin", toInsert);
})

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
