export class TableController {
  #model
  constructor(model) {
    this.#model = model;
  }

  get() {
    return this.#model.get();
  }

  set(data) {
    return this.#model.set(data);
  }

  delete(data) {
    return this.#model.delete(data);
  }

  update(data) {
    return this.#model.update(data);
  }
}
