export class ProjectModel {
  #api
  constructor(api) {
    this.#api = api;
  }

  getProjects() {
    return this.#api.get("http://localhost:5173/src/data/projects.json")
  }

}
