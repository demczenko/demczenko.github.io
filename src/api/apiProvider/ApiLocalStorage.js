export class ApiLocalStorage {
  async get(key) {
    const prev = localStorage.getItem(key) || "[]";
    const response = new Response(prev);
    const data = await response.json();
    return data;
  }

  async set(key, data) {
    let prev = this.#parse(() => localStorage.getItem(key) || "[]");
    localStorage.setItem(
      key,
      this.#stringify(() => [...prev, data])
    );

    const response = new Response(data);
    const res = await response.json();
    return res;
  }

  async delete(key, id) {
    let prev = this.#parse(() => localStorage.getItem(key) || "[]");

    const filtered = prev.filter((item) => item.id !== id);

    localStorage.setItem(
      key,
      this.#stringify(() => filtered)
    );

    const response = new Response(data);
    const res = await response.json();
    return res;
  }

  async update(key, data) {
    let prev = this.#parse(() => localStorage.getItem(key) || "[]");

    prev = prev.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          ...data,
        };
      }

      return item;
    });

    localStorage.setItem(
      key,
      this.#stringify(() => prev)
    );

    const response = new Response(data);
    const res = await response.json();
    return res;
  }

  #parse(data) {
    try {
      const result = JSON.parse(data());
      return result;
    } catch (error) {
      console.warn(error);
    }
  }

  #stringify(data) {
    try {
      const result = JSON.stringify(data());
      return result;
    } catch (error) {
      console.warn(error);
    }
  }
}
