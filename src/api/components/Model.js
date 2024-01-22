export class ComponentsModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path
  }


  getComponents() {
    return this.#api.get(this.#path)
  }

  setComponents(data) {
    return this.#api.set(this.#path, data);
  }
}
