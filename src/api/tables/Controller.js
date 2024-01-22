export class TableController {
  #model
  constructor(model) {
    this.#model = model;
  }

  getTables() {
    return this.#model.getTables();
  }

  setTables(data) {
    return this.#model.setTables(data);
  }

  deleteTable(data) {
    return this.#model.deleteTable(data);
  }
}
