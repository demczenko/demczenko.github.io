export class TabledataModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path
  }

  getTabledata() {
    return this.#api.get(this.#path)
  }

  setTabledata(data) {
    return this.#api.set(this.#path, data);
  }
}
  

