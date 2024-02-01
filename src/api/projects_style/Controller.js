export class ProjectStyleController {
  #model;
  constructor(model) {
    this.#model = model;
  }

  get() {
    return this.#model.get();
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
