import { buttonVariants } from "./components/ui/button";
import { PageContainer } from "./pages";
import { Link } from "react-router-dom";

const NotFound = ({ title, action }) => {
  return (
    <PageContainer title={title ?? "Not found"}>
      {action && (
        <div className="mt-6">
          <Link
            className={buttonVariants({ variant: "outline" })}
            to={action.to}>
            {action.title}
          </Link>
        </div>
      )}
    </PageContainer>
  );
};

export default NotFound;
