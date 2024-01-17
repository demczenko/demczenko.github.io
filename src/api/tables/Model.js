export class TablesModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getTables() {
    return this.#api.get("tables")
  }

  setTables(data) {
    return this.#api.set("tables", data);
  }
}
