export class ProjectController {
  #model
  constructor(model) {
    this.#model = model;
  }

  async get() {
    return await this.#model.get();
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
