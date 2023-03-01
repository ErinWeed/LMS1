export default class ListView {
  constructor(storage, options={}) {
    this.storage = storage
    this.options = options
    this.initView();
  }

  initView() {
    this.bindWrapperEvents()
  }

  //getters
  get $headerIcon() {
    //gets up or down arrow for column
    return $(`#${this.storage.sortCol}-${this.storage.sortDir}`)
  }

  get $listContainer() {
    //gets div that holds table
    return $(`#${this.options.listContainerId}`)
  }

  get $alertContainer() {
    //gets container that holds alert
    return $(`#${this.alertContainerId}`)
  }

  get alertContainerId() {
    //gets the id of div that holds alert
    return this.options.alertContainerId
  }

  get $modal() {
    //gets the modal
    return $("#" + this.options.modalContainerId);
  }

  get modalId() {
    //gets the id of the modal
    return `#${this.options.modalContainerId}`
  }

  get entitySingle() {
      return this.options.entitySingle
  }

  get $resetBtn() {
    //gets the reset button
    return $("#" + this.options.resetBtnId);
  }

  async render() {
    //renders table
    let data = this.storage.sort(this.storage.sortCol, this.storage.sortDir, true)
    let html = `
    <table class="table table-striped table-bordered text-center bg-light">
    <thead>
      <tr>
        <th class="table-header" data-col="name">
          Zone
          <i id="name-asc" class="bi bi-caret-up-fill" style="display:none"></i>
          <i id="name-desc" class="bi bi-caret-down-fill" style="display:none"></i>
        </th>
        <th class="table-header" data-col="squareFeet">
          Square Feet
          <i id="squareFeet-asc" class="bi bi-caret-up-fill" style="display:none"></i>
          <i id="squareFeet-desc" class="bi bi-caret-down-fill" style="display:none"></i>
        </th>
        <th class="d-none d-sm-table-cell table-header" data-col="colorScheme">
          Color Scheme
          <i id="colorScheme-asc" class="bi bi-caret-up-fill" style="display:none"></i>
          <i id="colorScheme-desc" class="bi bi-caret-down-fill" style="display:none"></i>
        </th>
        <th class="d-none d-sm-table-cell table-header" data-col="sunlight">
          Sunlight
          <i id="sunlight-asc" class="bi bi-caret-up-fill" style="display:none"></i>
          <i id="sunlight-desc" class="bi bi-caret-down-fill" style="display:none"></i>
        </th>
        <th>Action</th>
      </tr>
    </thead>
`
  for (let row of data) {
    let tableRow = `
    <tr id=${row.name}
      data-bs-toggle="popover"
      data-id="${row.id}"
      data-bs-content="${row.name}"
      data-bs-trigger="hover"
      data-bs-delay="300">
      <th>${row.name}</th>
      <td>${row.squareFeet}</td>
      <td class="d-none d-sm-table-cell">${row.colorScheme}</td>
      <td class="d-none d-sm-table-cell">${row.sunlight}</td>
      <td>
        <button class="btn"><i class="bi bi-pencil-square"></i></button>
        <button class="btn delete-this" data-bs-toggle="modal" data-bs-target="${this.modalId}"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>`
    html += tableRow
  }
  html +=   `</table>`

  this.$listContainer.html(html)
  this.bindListEvents()
  }

  bindWrapperEvents() {
    let that = this
    let $deleteModal = this.$modal

    $deleteModal.on('show.bs.modal', async function(e){
      let button = e.relatedTarget
      let rowId = $(button).closest("tr").attr('data-id');

      let data = await that.storage.read(rowId)
      let dataName = data.name
      let $modalBody = $('.confirmation-text')
      $modalBody.text(`Are you sure you want to delete ${dataName}?`)

      $deleteModal.attr("data-id", rowId)
      $deleteModal.attr("data-name", dataName)
    })

    $('.confirm-delete').click((e)=>{
      console.log($deleteModal.attr("data-id"))
      console.log(this.storage)
      this.storage.delete($deleteModal.attr("data-id"))
      this.render()
      let toInsert = `<div class="alert alert-danger alert-dismissible" id="delete-alert" role="alert">
      <h5 class="lead">${$deleteModal.attr("data-name")} deleted!</h5>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`
      this.$alertContainer.prepend(toInsert)
    })

    this.$resetBtn.click((e) => {
      this.storage.reset()
      this.render()
    })
  }

  bindListEvents() {
    let that = this

    $(".table-header").click(function(e){
      let sortCol = $(this).attr("data-col")
      console.log(sortCol)
      let currentDirection = that.storage.sortDir
      if (that.storage.sortCol === sortCol) {
        that.storage.sortDir = (currentDirection == "asc" ? "desc" : "asc") // switch sort direction
      } else {
        that.storage.sortDir = "asc"
        that.storage.sortCol = sortCol
      }

      that.render()
    })

    this.$headerIcon.show()

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  }
}