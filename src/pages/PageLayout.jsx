import React from "react";
import { PageContainer } from ".";
import { Heading } from "@/components";

const PageLayout = ({ title, content, filters, actions }) => {
  return (
    <PageContainer>
      <div className="grid lg:grid-cols-[repeat(auto-fill,300px);] gap-6">
        <div className="col-span-full">
          <Heading title={title} actions={actions} />
          {filters && filters}
        </div>
        {content}
      </div>
    </PageContainer>
  );
};

export default PageLayout;
