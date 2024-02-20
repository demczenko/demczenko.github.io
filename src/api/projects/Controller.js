export class ProjectController {
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

  async update(id, data) {
    return await this.#model.update(id, data);
  }

  async delete(data) {
    return await this.#model.delete(data);
  }
}
