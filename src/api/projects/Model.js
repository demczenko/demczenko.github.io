export class ProjectModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getProjects() {
    return this.#api.get("projects")
  }

}
