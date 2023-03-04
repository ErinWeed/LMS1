import LocalStorageService from "../model/local_storage_service.js";
import zoneData from "../model/zone_data.js";
import ListView from "../view/list_view.js";
import carouselData from "../model/carousel_data.js";
import CarouselView from "../view/carousel_view.js";

export default class AppController {
  constructor() {
    this.storage = new LocalStorageService(zoneData, "zoneData");
    this.carouselStorage = new LocalStorageService(carouselData, "carouselData")

    this.ListView = new ListView(this.storage, {
      listContainerId: "table-container",
      modalContainerId: "delete-modal",
      alertContainerId: "alert-container",
      entitySingle: "zone",
      resetBtnId: "reset-button"
    });

    this.CarouselView = new CarouselView(this.carouselStorage, {
      carouselContainerId: "carousel-container"
    })
    this.render();
  }
  async render(){
    await this.ListView.render();
  }
}