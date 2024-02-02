export class ProjectModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path
  }

  async get() {
    return await this.#api.get(this.#path)
  }

  async set(data) {
    return await this.#api.set(this.#path, data);
  }

  async update(data) {
    return await this.#api.update(this.#path, data);
  }

  async delete(data) {
    return await this.#api.delete(this.#path, data);
  }
}
