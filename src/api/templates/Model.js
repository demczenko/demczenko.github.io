export class TemplateModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path;
  }

  get(id) {
    return this.#api.get(this.#path, id)
  }

  set(data) {
    return this.#api.set(this.#path, data);
  }

  update(data) {
    return this.#api.update(this.#path, data);
  }

  delete(data) {
    return this.#api.delete(this.#path, data);
  }
}
