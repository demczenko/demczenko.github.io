import { useComponents } from "@/hooks/useComponents";
import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "..";

const Component = () => {
  const { id } = useParams();
  const {
    data: component,
    isError,
    isLoading,
    set: setComponent,
  } = useComponents("?id=" + id);

  return (
    <PageContainer
      isError={isError}
      isLoading={isLoading}
      title={"Component " + component[0]?.component_name}></PageContainer>
  );
};

export default Component;
