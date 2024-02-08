import ErrorPage from "@/ErrorPage";
import { Heading } from "@/components";
import { SkeletonCard } from "@/components/SkeletonCard";
import React from "react";

const PageContainer = ({ children, isError, isLoading, title, action }) => {
  return (
    <div className="pt-4 px-6 h-full relative">
      {title && <Heading title={title} action={action} />}
      {isLoading ? <SkeletonCard /> : children}
      {isError && (
        <ErrorPage
          title={`Something went wrong while ${
            title && title.toLowerCase()
          } loading...`}
        />
      )}
    </div>
  );
};

export default PageContainer;
