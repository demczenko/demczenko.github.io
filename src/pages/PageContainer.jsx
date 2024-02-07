import ErrorPage from "@/ErrorPage";
import LoadingPage from "@/LoadingPage";
import { Heading } from "@/components";
import React from "react";

const PageContainer = ({ children, isError, isLoading, title, action }) => {
  return (
    <div className="pt-10 xl:px-12 px-4 h-full relative">
      <Heading title={title} action={action} />
      {isLoading ? (
        <LoadingPage title={"Loading your + " + title.toLowerCase()} />
      ) : (
        children
      )}
      {isError && (
        <ErrorPage
          title={`Something went wrong while ${title.toLowerCase()} loading...`}
        />
      )}
    </div>
  );
};

export default PageContainer;
