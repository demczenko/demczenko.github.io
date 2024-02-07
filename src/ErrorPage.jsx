import React from "react";
import { Heading } from "./components";
import { Button } from "./components/ui/button";

const ErrorPage = ({ title, refresh }) => {
  return (
    <>
      <Heading title={title ?? "Error page"} />
      {refresh && <Button onClick={refresh}>Try again</Button>}
    </>
  );
};

export default ErrorPage;
