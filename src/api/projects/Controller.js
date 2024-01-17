export class ProjectController {
  #model
  constructor(model) {
    this.#model = model;
  }

  getProjects() {
    return this.#model.getProjects();
  }

  setProject(data) {
    return this.#model.setProject(data);
  }

}
