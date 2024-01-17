export class ApiFetch {
  #baseUrl
  constructor(baseUrl) {
    this.#baseUrl = baseUrl
  }
  get(path) {
    return fetch(this.#baseUrl + path + ".json");
  }
}
