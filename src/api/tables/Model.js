export class TablesModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getTables() {
    return this.#api.get("http://localhost:5173/src/data/tables.json")
  }

}
