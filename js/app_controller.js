import LocalStorageService from "./local_storage_service.js";
import teamData from "./team_data.js";
import ListView from "./list_view.js";

export default class AppController {
  constructor() {
    console.log('app controller constructor')
    this.storage = new LocalStorageService(teamData, "teamData");
    this.ListView = new ListView(this.storage)
    this.render();
  }
  async render(){
    await this.ListView.render();
  }
}
