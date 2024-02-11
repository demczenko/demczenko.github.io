import { DataTableService } from "@/api/tables data/init";
import { useState, useEffect } from "react";

export const useDataTables = (params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const get = async (params) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await DataTableService.get(params);
      setData(response);
    } catch (error) {
      setIsError(true);
      console.warn(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get(params);
  }, []);

  const update = async (new_data_table) => {
    try {
      const response = await DataTableService.update(new_data_table);
      setData((prev) => {
        return prev.map((item) => {
          if (item.id === new_data_table.id) {
            return {
              ...item,
              ...new_data_table,
            };
          }
          return item;
        });
      });
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const set = async (new_data_table) => {
    try {
      const response = await DataTableService.set(new_data_table);
      setData((prev) => [...prev, response]);
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const remove = async (id) => {
    try {
      await DataTableService.delete(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    isLoading,
    isError,
    data,
    update,
    remove,
    set,
  };
};
