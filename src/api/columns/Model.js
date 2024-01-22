export class ColumnModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path;
  }

  getColumns() {
    return this.#api.get(this.#path )
  }

  setColumns(data) {
    return this.#api.set(this.#path , data);
  }

  updateColumn(data) {
    return this.#api.update(this.#path , data);
  }
}
