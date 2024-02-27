export const useImportCSV = (data, acceptedColumns) => {
  // 1. Filter imported data by accepted keys in order to get only accepted columns from user CSV
  const sorted_data_items = [];
  // data_item = object from CSV table with keys that are responsible for columns (Slug: "de")
  for (const data_item of data) {
    // check if accepted keys includes column name that user specified
    // and add to accepted_data_items.
    const accepted_data_items = {};
    // Object with column (keys) names from CSV table
    for (const key in data_item) {
      let lowerKey = key.toLowerCase();

      // check if length of content is greater than 0
      // if (acceptedColumns.includes(lowerKey)) {
      //   if (data_item[key].length > 0) {
      //     accepted_data_items[lowerKey] = data_item[key];
      //   }
      // }

      // not check if length of content is greater than 0
      if (acceptedColumns.includes(lowerKey)) {
        accepted_data_items[lowerKey] = data_item[key];
      }
    }

    // Filter out if accepted_data_items doesn't have the same length as acceptedColumns length
    // if (Object.keys(accepted_data_items).length !== acceptedColumns.length) {
    //   console.error("Some key is empty for: " + accepted_data_items.slug);
    // } else {
    //   let sorted = {};
    //   // 2. Sort data items according to acceptedColumns
    //   for (const accepted_column_name of acceptedColumns) {
    //     sorted = {
    //       ...sorted,
    //       [accepted_column_name]: accepted_data_items[accepted_column_name],
    //       table_id: table_id,
    //       id: uuidv4(),
    //     };
    //   }
    //   sorted_data_items.push(sorted);
    // }

    // Not Filter out if accepted_data_items doesn't have the same length as acceptedColumns length
    let sorted = {};
    // 2. Sort data items according to acceptedColumns
    for (const accepted_column_name of acceptedColumns) {
      sorted = {
        ...sorted,
        [accepted_column_name]: accepted_data_items[accepted_column_name],
      };
    }
    sorted_data_items.push(sorted);
  }
  return sorted_data_items;
};
