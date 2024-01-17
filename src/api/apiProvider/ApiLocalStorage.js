export class ApiLocalStorage {
  get(key) {
    const prev = localStorage.getItem(key) || "[]";
    // const prev = this.#parse(() => localStorage.getItem(key) || "[]");
    return new Response(prev)
  }

  set(key, data) {
    const prev = this.#parse(() => localStorage.getItem(key) || "[]");
    localStorage.setItem(key, this.#stringify(() => [...prev, data]));
  }

  #parse(data) {
    try {
      const result = JSON.parse(data());
      return result
    } catch (error) {
      console.warn(error);
    }
  }

  #stringify(data) {
    try {
      const result = JSON.stringify(data());
      return result
    } catch (error) {
      console.warn(error);
    }
  }
}
