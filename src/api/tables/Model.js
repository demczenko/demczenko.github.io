export class TablesModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path
  }

  getTables() {
    return this.#api.get(this.#path)
  }

  setTables(data) {
    return this.#api.set(this.#path, data);
  }
}
