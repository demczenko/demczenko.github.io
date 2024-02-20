export class TableController {
  #model
  constructor(model) {
    this.#model = model;
  }

  async get(id) {
    return await this.#model.get(id);
  }

  async getAll(id) {
    return await this.#model.getAll(id)
  }

  async set(data) {
    return await this.#model.set(data);
  }

  async delete(data) {
    return await this.#model.delete(data);
  }

  async update(id, data) {
    return await this.#model.update(id, data);
  }
}
