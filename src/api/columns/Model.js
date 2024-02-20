export class ColumnModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path;
  }

  async get() {
    return await this.#api.get(this.#path )
  }
  
  async getAll(id) {
    return await this.#api.getAll(this.#path, id)
  }

  async set(data) {
    return await this.#api.set(this.#path , data);
  }

  async update(id, data) {
    return await this.#api.update(this.#path, id, data);
  }

  async delete(data) {
    return await this.#api.delete(this.#path, data);
  }
}
