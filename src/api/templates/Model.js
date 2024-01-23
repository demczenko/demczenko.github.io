export class TemplateModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path;
  }

  getTemplates() {
    return this.#api.get(this.#path)
  }

  setTemplates(data) {
    return this.#api.set(this.#path, data);
  }

  updateTemplate(data) {
    return this.#api.update(this.#path, data);
  }

  deleteTemplate(data) {
    return this.#api.delete(this.#path, data);
  }
}
