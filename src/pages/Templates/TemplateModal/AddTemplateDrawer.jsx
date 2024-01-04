
import TemplateForm from "./TemplateForm";

export const AddTemplateDrawer = ({ onSubmitForm }) => {

  return (
    <div className="mt-4">
      <TemplateForm onSubmitForm={onSubmitForm}/>
    </div>
  );
};
