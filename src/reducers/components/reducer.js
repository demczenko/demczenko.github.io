import { useToast } from "@/components/ui/use-toast";
import { useReducer } from "react";

const init = {
  components: [],
};

const ComponentsReducer = (state, action) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const { mutate: onCreate, isLoading: onCreateLoading } = useComponentCreate();

  switch (action.type) {
    case "create":

      
    default:
      return state;
  }
};

export const useDispatchComponents = () => {
  const [components, dispatch] = useReducer(ComponentsReducer, init);

  return {
    components,
    dispatch,
  };
};
