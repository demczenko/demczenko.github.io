import React from "react";
import { PageContainer } from ".";
import { Heading } from "@/components";

const PageLayout = ({ title, content, actions }) => {
  return (
    <PageContainer>
      <div className="grid lg:grid-cols-[repeat(auto-fill,300px);] gap-6">
        <Heading title={title} actions={actions} />
        {content}
      </div>
    </PageContainer>
  );
};

export default PageLayout;
