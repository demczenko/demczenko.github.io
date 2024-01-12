export class ColumnModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getColumns() {
    return this.#api.get("http://localhost:5173/src/data/columns.json")
  }

}
