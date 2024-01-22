export class ComponentsController {
  #model
  constructor(model) {
    this.#model = model;
  }

  getComponents() {
    return this.#model.getComponents();
  }

  setComponents(data) {
    return this.#model.setComponents(data);
  }

}
