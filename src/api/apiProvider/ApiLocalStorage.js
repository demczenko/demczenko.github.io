export class ApiLocalStorage {
  async get(key) {
    return new Promise((res, rej) => {
      const response = this.#parse(() => localStorage.getItem(key) || "[]");
      res(response);
    });
  }

  async set(key, data) {
    return new Promise((res, rej) => {
      let response = this.#parse(() => localStorage.getItem(key) || "[]");
      localStorage.setItem(
        key,
        this.#stringify(() => [...response, data])
      );

      res([data]);
    });
  }

  async delete(key, id) {
    return new Promise((res, rej) => {
      let prev = this.#parse(() => localStorage.getItem(key) || "[]");

      const filtered = prev.filter((item) => item.id !== id);

      localStorage.setItem(
        key,
        this.#stringify(() => filtered)
      );

      res(true);
    });
  }

  async update(key, data) {
    return new Promise((res, rej) => {
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

      res([data]);
    });
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
