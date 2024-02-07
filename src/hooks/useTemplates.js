import { TemplatesService } from "@/api/templates/init";
import { useState, useEffect } from "react";

export const useTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getTemplateList() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await TemplatesService.get();
        setData(response);
      } catch (error) {
        setIsError(true);
        console.warn(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getTemplateList();
  }, []);

  const update = async (new_template) => {
    try {
      const response = await TemplatesService.update(new_template);
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
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const set = async (new_data_table) => {
    try {
      const response = await TemplatesService.set(new_data_table);
      setData((prev) => [...prev, response]);
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const remove = async (id) => {
    try {
      await TemplatesService.delete(id);
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
