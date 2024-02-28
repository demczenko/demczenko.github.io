import HandleNewItem from "@/pages/Projects/ProjectsModal/HandleNewItem";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { TabsContent } from "./ui/tabs";

const ManualTableFulFill = ({
  error,
  key_id,
  id,
  columns,
  table_id,
  tableData,
  columnsData,
  handleImport,
  handleUpdate,
}) => {
  const handleNewItemAdd = async (data) => {
    let isExist = false;
    let itemId;
    const new_item = {
      data: data,
      slug: data.slug,
      id: uuidv4(),
      table_id: table_id,
      [key_id]: id,
    };

    for (const data_item of tableData ?? []) {
      if (new_item.data.slug === data_item.data.slug) {
        isExist = true;
        itemId = data_item.id;
      }
    }

    if (!isExist) {
      handleImport(new_item);
    } else {
      handleUpdate({ ...new_item, id: itemId });
    }
  };

  return (
    <TabsContent className="data-[state=active]:flex flex-col grow" value={"manually"}>
      {columnsData.length === 0 && (
        <>
          <HandleNewItem fields={columns} onSubmit={handleNewItemAdd} />
          {error && (
            <p className="text-sm font-semibold text-red-300 mt-4">{error}</p>
          )}
        </>
      )}
    </TabsContent>
  );
};

export default ManualTableFulFill;
