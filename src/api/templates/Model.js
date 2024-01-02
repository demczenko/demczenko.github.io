export class TemplateModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getTemplates() {
    return this.#api.get("http://localhost:5173/src/data/templates.json")
  }

}
