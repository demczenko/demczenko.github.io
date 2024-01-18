export class ApiLocalStorage {
  get(key) {
    const prev = localStorage.getItem(key) || "[]";
    // const prev = this.#parse(() => localStorage.getItem(key) || "[]");
    return new Response(prev)
  }

  set(key, data) {
    let prev = this.#parse(() => localStorage.getItem(key) || "[]");

    prev = prev.map(item => {
      if (item.id === data.id) {
        return {
          ...item,
          ...data
        }
      }

      return item
    })

    localStorage.setItem(key, this.#stringify(() => [...prev, data]));
  }

  update(key, data) {
    let prev = this.#parse(() => localStorage.getItem(key) || "[]");

    prev = prev.map(item => {
      if (item.id === data.id) {
        return {
          ...item,
          ...data
        }
      }

      return item
    })

    localStorage.setItem(key, this.#stringify(() => prev));
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
