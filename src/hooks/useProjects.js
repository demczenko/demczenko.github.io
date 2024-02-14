import { ProjectService } from "@/api/projects/init";
import { useState, useEffect } from "react";

export const useProjects = (params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const get = async (params) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await ProjectService.get(params);
      if (Array.isArray(response)) {
        setData(response);
      } else {
        setData([response])
      }
    } catch (error) {
      setIsError(true);
      setData([])
      console.warn(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    get(params);
  }, []);

  const update = async (new_project) => {
    try {
      setIsLoading(true);
      const response = await ProjectService.update(new_project);
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
      return false
    } finally {
      setIsLoading(false);
    }
  };

  const set = async (new_data_table) => {
    try {
      setIsLoading(true);
      const response = await ProjectService.set(new_data_table);
      setData((prev) => [...prev, response[0]]);
      console.log(response);
      return response
    } catch (error) {
      console.error(error);
      return false
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setIsLoading(true);
      const isDeleted = await ProjectService.delete(id);
      if (isDeleted) {
        setData((prev) => prev.filter((item) => item.id !== id));
      }
      return true
    } catch (error) {
      console.error(error);
      return false
    } finally {
      setIsLoading(false);
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
