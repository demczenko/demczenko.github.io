export class ComponentsController {
  #model
  constructor(model) {
    this.#model = model;
  }

  async get(id) {
    return await this.#model.get(id);
  }

  async set(data) {
    return await this.#model.set(data);
  }

  async update(data) {
    return await this.#model.update(data);
  }

  async delete(data) {
    return await this.#model.delete(data);
  }

}
