export class TabledataController {
  #model
  constructor(model) {
    this.#model = model;
  }

  getTabledata() {
    return this.#model.getTabledata();
  }

}
