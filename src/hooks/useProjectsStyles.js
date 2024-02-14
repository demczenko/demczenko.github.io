import { ProjectStyleService } from "@/api/projects_style/init";
import { useState, useEffect } from "react";

export const useProjectsStyles = (params) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const get = async (params) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await ProjectStyleService.get(params);
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
  };

  useEffect(() => {
    get(params);
  }, []);

  const update = async (new_project) => {
    try {
      setIsLoading(true);
      const response = await ProjectStyleService.update(new_project);
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
    } finally {
      setIsLoading(false);
    }
  };

  const set = async (new_data_table) => {
    try {
      setIsLoading(true);
      const response = await ProjectStyleService.set(new_data_table);
      setData((prev) => [...prev, response[0]]);
      return response;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setIsLoading(true);
      await ProjectStyleService.delete(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (error) {
      console.error(error);
      return false;
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
