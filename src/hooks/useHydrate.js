export function useHydrate(dataSlug, htmlTemplate, tables, projectStyle ) {
  const document = new DOMParser().parseFromString(htmlTemplate, "text/html");
  const dataText = Array.from(document.querySelectorAll("[data-text]"));
  const dataSrc = Array.from(document.querySelectorAll("[data-src]"));
  const dataUrl = Array.from(document.querySelectorAll("[data-href]"));
  const dataPlaceholder = Array.from(
    document.querySelectorAll("[data-placeholder]")
  );

  // Iterate over DataText
  for (const node of dataText) {
    const textKey = node.getAttribute("data-text").toLowerCase();

    for (const data of dataSlug) {
      if (textKey in data.data) {
        const dataTable = node.getAttribute("data-table");
        const table = tables.find(
          (table) => table.table_name.toLowerCase() === dataTable.toLowerCase()
        );
        if (table) {
          if (table.id === data.table_id) {
            node.textContent = data.data[textKey];
          }
        }
      }
    }
  }

  // Iterate over DataSrc

  for (const node of dataSrc) {
    const srcKey = node.getAttribute("data-src").toLowerCase();
    for (const data of dataSlug) {
      if (srcKey in data.data) {
        const dataTable = node.getAttribute("data-table");
        const table = tables.find(
          (table) => table.table_name.toLowerCase() === dataTable.toLowerCase()
        );

        if (table) {
          if (table.id === data.table_id) {
            node.src = data.data[srcKey];
          }
        }
      }
    }
  }

  // Iterate over DataUrl
  for (const node of dataUrl) {
    const urlKey = node.getAttribute("data-href").toLowerCase();

    for (const data of dataSlug) {
      if (urlKey in data.data) {
        const dataTable = node.getAttribute("data-table");
        const table = tables.find(
          (table) => table.table_name.toLowerCase() === dataTable.toLowerCase()
        );
        if (table) {
          if (table.id === data.table_id) {
            node.href = data.data[urlKey];
          }
        }
      }
    }
  }

  // Iterate over dataPlaceholder
  for (const node of dataPlaceholder) {
    const placeholderKey = node.getAttribute("data-placeholder").toLowerCase();

    for (const data of dataSlug) {
      if (placeholderKey in data.data) {
        const dataTable = node.getAttribute("data-table");
        const table = tables.find(
          (table) => table.table_name.toLowerCase() === dataTable.toLowerCase()
        );
        if (table) {
          if (table.id === data.table_id) {
            node.placeholder = data.data[placeholderKey];
          }
        }
      }
    }
  }

  const nodes_to_update = document.querySelectorAll("[data-style-id]");

  if (nodes_to_update) {
    for (const node of nodes_to_update) {
      for (const item of projectStyle) {
        if (item.id === node.getAttribute("data-style-id")) {
          Object.assign(node.style, item.style);
        }
      }
    }
  }

  return document.documentElement.outerHTML;
}
