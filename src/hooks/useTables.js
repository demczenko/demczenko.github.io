import { TableService } from "@/api/tables/init";
import { useState, useEffect } from "react";

export const useTables = (params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const get = async (params) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await TableService.get(params);
      if (Array.isArray(response)) {
        setData(response);
      } else {
        setData([response])
      }
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

  const update = async (new_table) => {
    try {
      const response = await TableService.update(new_table);
      setData((prev) => {
        return prev.map((item) => {
          if (item.id === response[0].id) {
            return {
              ...item,
              ...response[0],
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
      const response = await TableService.set(new_data_table);
      setData((prev) => [...prev, response[0]]);
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const remove = async (id) => {
    try {
      await TableService.delete(id);
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
    set,
    remove,
  };
};
