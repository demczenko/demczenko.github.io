export class ColumnModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getColumns() {
    return this.#api.get("columns")
  }

  setColumns(data) {
    return this.#api.set("columns", data);
  }
}
