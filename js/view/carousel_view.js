export default class CarouselView {
  constructor(storage, options={}) {
    this.storage = storage
    this.options = options
    this.render()
  }

  async render() {
    let data = this.storage.list
    let html = ``
    let first = true
    for (let item of data) {
      if (first) {
        first = false
        html +=
        `<div class="carousel-item active">
          <img src="${item.picture}" alt="${item.alt}" class="d-block w-100"><div class="polaroid-caption">${item.caption}</div>
        </div>`
      } else {
      html +=
      `<div class="carousel-item">
        <img src="${item.picture}" alt="${item.alt}" class="d-block w-100"><div class="polaroid-caption">${item.caption}</div>
      </div>`
    }}
    $(`#${this.options.carouselContainerId}`).html(html)
  }
}