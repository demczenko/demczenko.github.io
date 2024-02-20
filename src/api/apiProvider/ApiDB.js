
export class ApiDB {
  #baseUrl;
  constructor(baseURl) {
    this.#baseUrl = baseURl;
  }

  async get(key, id) {
    const req = await fetch(this.#baseUrl + key + "/" + id);
    if (req.status === 404) {
      throw new Error("Not found");
    }
    if (!req.ok) {
      throw new Error(req.statusText);
    }

    const response = await req.json();
    return response;
  }

  async getAll(key, params) {
    const fetchUrl = Object.keys(params ?? {}).length ? this.#baseUrl + key + "/" + params : this.#baseUrl + key
    const req = await fetch(fetchUrl)

    if (!req.ok) {
      throw new Error("Error while fetching data");
    }

    const response = await req.json();
    return response;
  }

  async set(key, data) {
    const req = await fetch(this.#baseUrl + key, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!req.ok) {
      throw new Error(req.statusText);
    }

    const response = await req.json();
    return response;
  }

  async delete(key, id) {
    const req = await fetch(this.#baseUrl + key + "/" + id, {
      method: "DELETE",
    });
    if (!req.ok) {
      throw new Error(req.statusText);
    }

    const response = await req.json();
    return response;
  }

  async update(key, id, data) {
    const req = await fetch(this.#baseUrl + key + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!req.ok) {
      throw new Error(req.statusText);
    }

    const response = await req.json();
    return response;
  }
}