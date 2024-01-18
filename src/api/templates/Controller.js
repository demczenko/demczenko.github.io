export class TemplateController {
  #model
  constructor(model) {
    this.#model = model;
  }

  getTemplates() {
    return this.#model.getTemplates();
  }

  setTemplates(data) {
    return this.#model.setTemplates(data);
  }

  updateTemplate(data) {
    return this.#model.updateTemplate(data);
  }
}
