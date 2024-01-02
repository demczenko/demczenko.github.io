export class TemplateModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getTemplates() {
    return this.#api.get("src/data/templates.json")
  }
}
