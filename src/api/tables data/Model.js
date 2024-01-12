export class TabledataModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getTabledata() {
    return this.#api.get("http://localhost:5173/src/data/tables_data.json")
  }

}
