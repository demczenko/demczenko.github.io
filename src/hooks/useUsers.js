import { UserService } from "@/api/users/init";
import { useState, useEffect } from "react";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getProjectList() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await UserService.get();
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
    }

    getProjectList();
  }, []);

  const update = async (new_project) => {
    try {
      const response = await UserService.update(new_project);
      setData((prev) => {
        return prev.map((item) => {
          if (item.id === response.id) {
            return {
              ...item,
              ...response,
            };
          }
          return item;
        });
      });
      return response
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const set = async (new_data_table) => {
    try {
      const new_user = await UserService.set(new_data_table);
      setData((prev) => [...prev, new_user]);
      return new_user;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const remove = async (id) => {
    try {
      await UserService.delete(id);
      setData((prev) => prev.filter((item) => item.id !== id));
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
