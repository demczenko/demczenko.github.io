export class TabledataModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path
  }

  get() {
    return this.#api.get(this.#path)
  }

  set(data) {
    return this.#api.set(this.#path, data);
  }

  delete(data) {
    return this.#api.delete(this.#path, data);
  }

  update(data) {
    return this.#api.update(this.#path, data);
  }
}
  

