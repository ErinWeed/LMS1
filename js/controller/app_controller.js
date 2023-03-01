import LocalStorageService from "../model/local_storage_service.js";
import zoneData from "../model/zone_data.js";
import ListView from "../view/list_view.js";

export default class AppController {
  constructor() {
    console.log('app controller constructor')
    this.storage = new LocalStorageService(zoneData, "zoneData");

    this.ListView = new ListView(this.storage, {
      listContainerId: "table-container",
      modalContainerId: "delete-modal",
      alertContainerId: "alert-container",
      entitySingle: "zone",
      resetBtnId: "reset-button"
    });
    this.render();
  }
  async render(){
    await this.ListView.render();
  }
}
  // var storageSvc = new LocalStorageService(zoneData, "zoneData");

  // $("document").ready(function () {
  //   //Unit Test 1
  //   console.log("start test 1")
  //   storageSvc.delete(1);
  //   if (storageSvc.read(1) === null) console.log("delete successfull");
  //   if (storageSvc.size == 2)
  //     console.log("Size reports correct value, two remaining");
  //   let model = JSON.parse(localStorage["zoneData"]);
  //   if (storageSvc.size === model.data.length)
  //     console.log("localstorage size equal to reported local data size, deletes persisted");

  //   //Unit test 2
  //   console.log("start test 2")
  //   storageSvc.create({
  //     id: 14,
  //     name:"Terry's House",
  //     squareFeet: 200,
  //     colorScheme: "jewel tones",
  //     sunlight: "full sun",
  //   });
  //   if (storageSvc.read(14).name === "Terry's House")
  //     console.log("Create successfull");

  //   //Unit test 3
  //   console.log("start test 3")
  //   storageSvc.update({
  //     id: 14,
  //     name:"Terry's Front Yard",
  //     squareFeet: 200,
  //     colorScheme: "pastels",
  //     sunlight: "full sun",
  //   });
  //   if (storageSvc.read(14).name === "Terry's Front Yard")
  //     console.log("Test Team 14 updated successfully");

  //   storageSvc.clear();
    // storageSvc.reset();
  //   if (storageSvc.read(2).name === "Killer Bunnies")
  //     console.log("Reset, orig data restored");

  //   //Unit test 4
  //   console.log("start test 4")
  //   storageSvc.update({
  //     id: 2,
  //     name:"Terry's Front Yard",
  //     squareFeet: 200,
  //     colorScheme: "pastels",
  //     sunlight: "full sun",
  //   });

  //   storageSvc.clear(); //clear localStorage
  //   storageSvc.retrieve();
  //   if (storageSvc.read(2).colorScheme === "pastels")
  //     console.log("After clear/retrieve, data still updated");
  //   storageSvc.reset(); //reset data, original data should be there

  //   if (storageSvc.read(2).colorScheme === "mixed")
  //     console.log("After reset, orig data restored");

  //   //Unit Test 5
  //   console.log("start test 5")
  //   let list = storageSvc.list;

  //   if (list[0].name === "Front Lawn") {
  //     console.log("List retrieved correctly");
  //   }
  //   if (list.length===12)

  //     console.log("List size is correct:12");

  //   //Unit test 6
  //   console.log("start test 6")
  //   let teams = storageSvc.filter({squareFeet:2000});

  //   if (teams.length == 1) {
  //     console.log("Filter zone with squareFeet: 2000");
  //   }

  //   //Unit test 7
    // console.log("start test 7")
    // storageSvc.reset();
    // teams = storageSvc.sort("name", "asc");

    // if (teams[0].name === "Back Borders") {
    //   console.log("sorted asc, back borders first");
    // }

    // let teams = storageSvc.list;

    // if (teams[0].name === "Front Lawn") {
    //   console.log("sorted asc, orig data not changed");
    // }

    // storageSvc.sort("squareFeet", "asc", true); //sort permanently
    // teams = storageSvc.list;
    // if (teams[0].name === "Back Borders") {
    //   console.log("sorted permanently, list returns sorted values");
    // }
  // });



// this is the controller for our table. We might have more than one of these on larger applications.
// controller knows about the model and the view
// listens for events
//

