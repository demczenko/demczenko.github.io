export class TabledataModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getTabledata() {
    return this.#api.get("data_tables")
  }

}
