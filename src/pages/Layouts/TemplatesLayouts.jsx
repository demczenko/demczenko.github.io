import React from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";

const TemplatesLayouts = () => {
  return (
    <PageContainer>
      <Heading
        actions={[
          {
            id: 1,
            name: "Create layout",
            onClick: () => alert("Under development"),
          },
        ]}
        title={"Layouts"}
      />
    </PageContainer>
  );
};

export default TemplatesLayouts;
