export class ProjectModel {
  #api
  #path
  constructor(api, path) {
    this.#api = api;
    this.#path = path
  }

  getProjects() {
    return this.#api.get(this.#path)
  }

  setProject(data) {
    return this.#api.set(this.#path, data);
  }

}
