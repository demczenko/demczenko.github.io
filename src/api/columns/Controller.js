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

  updateColumn(data) {
    return this.#model.updateColumn(data);
  }

  deleteColumn(data) {
    return this.#model.deleteColumn(data);
  }
}
