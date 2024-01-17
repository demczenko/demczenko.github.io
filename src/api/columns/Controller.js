export class ColumnController {
  #model
  constructor(model) {
    this.#model = model;
  }

  getColumns() {
    return this.#model.getColumns();
  }

  setColumns(data) {
    return this.#model.setColumns(data);
  }
}
