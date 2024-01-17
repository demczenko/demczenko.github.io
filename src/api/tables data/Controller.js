export class TabledataController {
  #model
  constructor(model) {
    this.#model = model;
  }

  getTabledata() {
    return this.#model.getTabledata();
  }

  setTabledata(data) {
    return this.#model.setTabledata(data);
  }

}
