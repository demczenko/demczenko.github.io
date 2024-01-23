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

  deleteTabledata(data) {
    return this.#model.deleteTabledata(data);
  }

  updateTabledata(data) {
    return this.#model.updateTabledata(data);
  }
}
