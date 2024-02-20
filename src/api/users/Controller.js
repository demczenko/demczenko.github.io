export class UserController {
  #model
  constructor(model) {
    this.#model = model;
  }

  async get() {
    return await this.#model.get();
  }

  async getAll(id) {
    return await this.#model.getAll(id)
  }

  async set(data) {
    return await this.#model.set(data);
  }

  async update(id, data) {
    return await this.#model.update(data);
  }

  async delete(data) {
    return await this.#model.delete(data);
  }
}
