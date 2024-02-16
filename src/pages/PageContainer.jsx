import { Heading } from "@/components";

const PageContainer = ({ children, title, action }) => {

  return (
    <div className="pt-4 px-6 w-full h-full relative">
      {title && <Heading title={title} action={action} />}
      {children}
    </div>
  );
};

export default PageContainer;
