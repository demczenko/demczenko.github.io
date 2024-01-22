import React from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";

const Components = () => {
  return (
    <PageContainer>
      <Heading
        actions={[
          {
            id: 1,
            name: "Create component",
            onClick: () => alert("Under development"),
          },
        ]}
        title={"Components"}
      />
    </PageContainer>
  );
};

export default Components;
