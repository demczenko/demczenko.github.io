export class TemplateController {
  #model
  constructor(model) {
    this.#model = model;
  }

  get(id) {
    return this.#model.get(id);
  }

  set(data) {
    return this.#model.set(data);
  }

  update(data) {
    return this.#model.update(data);
  }

  delete(data) {
    return this.#model.delete(data);
  }
}
