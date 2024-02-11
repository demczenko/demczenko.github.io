import CartActions from "./CartActions";
import CartHeader from "@/components/CartHeader";

const TableCart = ({ item, onDeleteTable, onDuplicate }) => {
  return (
    <section className="group">
      <CartHeader table_id={item.id} table_name={item.table_name} />
      <CartActions
        onDuplicate={() => onDuplicate(item.id)}
        onModalOpen={() => setIsModalOpen(true)}
        onDelete={() => onDeleteTable(item.id)}
      />
    </section>
  );
};

export default TableCart;
