export class TemplateModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getTemplates() {
    return this.#api.get("templates")
  }

  setTemplates(data) {
    return this.#api.set("templates", data);
  }
}
