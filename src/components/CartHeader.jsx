import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CartHeader = ({ table_id, table_name }) => {
  return (
    <Link to={`/table/${table_id}`}>
      <h3 className="capitalize p-2 rounded bg-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer text-sm font-medium flex justify-between items-center">
        {table_name}
        <div className="overflow-hidden flex">
          <ArrowRightIcon className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
        </div>
      </h3>
    </Link>
  );
};

export default CartHeader;