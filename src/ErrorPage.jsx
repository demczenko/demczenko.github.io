import React from "react";
import { Heading } from "./components";
import { PageContainer } from "./pages";
import { Button } from "./components/ui/button";

const ErrorPage = ({ title, refresh }) => {
  return (
    <PageContainer>
      <Heading title={title ?? "Error page"}/>
      {refresh && (
        <Button onClick={refresh}>Try again</Button>
      )}
    </PageContainer>
  );
};

export default ErrorPage;
