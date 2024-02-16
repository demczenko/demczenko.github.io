import React from "react";
import { Button } from "./components/ui/button";
import { PageContainer } from "./pages";

const ErrorPage = ({ title, refresh }) => {
  return (
    <PageContainer title={title ?? "Error page"}>
      {refresh && <Button onClick={refresh}>Try again</Button>}
    </PageContainer>
  );
};

export default ErrorPage;
