
export class ApiDB {
  #baseUrl;
  constructor(baseURl) {
    this.#baseUrl = baseURl;
  }

  async get(key) {
    const req = await fetch(this.#baseUrl + key);
    if (!req.ok) {
      throw new Error(prev.statusText);
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
      throw new Error(prev.statusText);
    }

    const response = await req.json();
    return response;
  }

  async delete(key, id) {
    const req = await fetch(this.#baseUrl + key + "/" + id, {
      method: "DELETE",
    });
    if (!req.ok) {
      throw new Error(prev.statusText);
    }

    const response = await req.json();
    return response;
  }

  async update(key, data) {
    const req = await fetch(this.#baseUrl + key + "/" + data.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!req.ok) {
      throw new Error(prev.statusText);
    }

    const response = await req.json();
    return response;
  }
}