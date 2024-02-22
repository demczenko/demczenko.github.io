export function hydrateTemplate({ template, data_slug, tables, projectStyle }) {
  if (!template || !data_slug || !tables) return "";
  const document = new DOMParser().parseFromString(template, "text/html");
  const hrefs = Array.from(document.querySelectorAll("[data-href]"));
  const srcs = Array.from(document.querySelectorAll("[data-src]"));
  const text = Array.from(document.querySelectorAll("[data-text]"));
  const nodes_to_update = document.querySelectorAll("[data-style-id]");

  for (const { table_id, data } of data_slug) {
    swapHref(hrefs, data, table_id, tables);
  }

  for (const { table_id, data } of data_slug) {
    swapSrc(srcs, data, table_id, tables);
  }

  for (const { table_id, data } of data_slug) {
    swapText(text, data, table_id, tables);
  }

  if (nodes_to_update) {
    for (const node of nodes_to_update) {
      for (const item of projectStyle ?? []) {
        if (item.id === node.getAttribute("data-style-id")) {
          Object.assign(node.style, item.style);
        }
      }
    }
  }

  return document.documentElement.innerHTML;
}

function swapHref(hrefs, data, table_id, tables) {
  for (const node of hrefs) {
    const key = node.getAttribute("data-href");
    const dataTable = node.getAttribute("data-table");

    const table = tables.find(
      (table) => table.table_name.toLowerCase() === dataTable.toLowerCase()
    );
    if (table) {
      if (table.id === table_id) {
        node["href"] = data[key.toLowerCase()];
      }
    }
  }
}

function swapText(text, data, table_id, tables) {
  for (const node of text) {
    const key = node.getAttribute("data-text");
    const dataTable = node.getAttribute("data-table");

    const table = tables.find(
      (table) => table.table_name.toLowerCase() === dataTable.toLowerCase()
    );
    if (table) {
      if (table.id === table_id) {
        node["textContent"] = data[key.toLowerCase()];
      }
    }
  }
}

function swapSrc(src, data, table_id, tables) {
  for (const node of src) {
    const key = node.getAttribute("data-src");
    const dataTable = node.getAttribute("data-table");

    const table = tables.find(
      (table) => table.table_name.toLowerCase() === dataTable.toLowerCase()
    );
    if (table) {
      if (table.id === table_id) {
        node["src"] = data[key.toLowerCase()];
      }
    }
  }
}
