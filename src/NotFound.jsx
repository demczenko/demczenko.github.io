import { Heading } from "./components";
import { buttonVariants } from "./components/ui/button";
import { PageContainer } from "./pages";
import { Link } from "react-router-dom";

const NotFound = ({ title, action }) => {
  return (
    <PageContainer title={title ?? "Not found"}>
      {action && <Link className={buttonVariants({variant: "outline"})} to={action.to}>{action.title}</Link>}
    </PageContainer>
  );
};

export default NotFound;
