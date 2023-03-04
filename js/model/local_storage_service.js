export default class LocalStorageService {
  "use strict"
  constructor(data, key) {
    this.origModel = data;
    this.key = key;

    if(!this.retrieve()){
      this.model = this.cloneObject(data);   //get copy of data
      this.sort(this.sortCol, this.sortDir, true);   //apply default sort
    }
  }

  // GETTERS AND SETTERS
  get sortCol(){
    return this.model.app.sortCol;
  }

  set sortCol(col){
    this.model.app.sortCol = col;
  }

  get sortDir(){
    return this.model.app.sortDir;
  }

  set sortDir(dir){
    this.model.app.sortDir = dir;
  }

  get size() {
    return this.model.data.length
  }

  get list() { //async function, sorts first based in current
    return this.model.data
  }

   //CRUD FUNCTIONS
  create(obj) {
    this.model.data.push(obj);
    this.store();
  }

  read(getId) {
    let zones = this.model.data
    for (let zone of zones) {
      if (zone.id == getId) {
        return zone
      }
    }
    return null
  }

  update(obj) {
    let toUpdate = this.read(obj.id)
    let index = this.findIndex(toUpdate)
    this.model.data[index] = obj
  }

  delete(removeId) {
    let toDelete = this.read(removeId)
    let index = this.findIndex(toDelete)
    this.model.data.splice(index,1)
    this.store()
  }

  //LocalStorage Functions
  reset() {
    localStorage.clear()
    this.model = this.cloneObject(this.origModel)
    this.store()
  }

  clear() {
    localStorage.clear();
  }

  store() {
    localStorage.setItem(this.key, JSON.stringify(this.model))
  }

  retrieve() {
    let ret = localStorage.getItem(this.key);
    if(ret !=null){
      let obj= JSON.parse(ret);
      this.model=obj;
      return true;
    }
    return false;
  }

  //Sorting and Filtering Functions
  sort(col, direction, perm = false) {

    let teams = this.cloneObject(this.model.data)
    if (teams.length > 0) {
    let multiplier = 1
    if (direction == "desc") multiplier = -1

    if (typeof teams[0][col] == 'number') {
      teams.sort((a,b)=>(a[col]-b[col]) * multiplier)
    } else if (typeof teams[0][col] == 'string') {
      teams.sort((a,b)=> (a[col].localeCompare(b[col])) * multiplier)
    }
    if (perm) {
      this.model.data = teams
      this.store()
    }
    return teams
    } else {
      return teams
    }
  }

  filter(filterObj) {
    const teams = this.model.data
    const filtered = teams.filter((team) => {
    let filter = false
      for (let attribute in filterObj) {
        if (team[attribute] == filterObj[attribute]) filter = true
      }
      return filter
    })
    return filtered
  }

   //Utility functions
  findIndex(objToDelete) {
    return this.model.data.findIndex((team)=> team == objToDelete)
  }

  cloneObject(obj){
    return JSON.parse(JSON.stringify(obj));
  }
}