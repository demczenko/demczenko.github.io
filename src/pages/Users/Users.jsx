import React, { useState } from "react";
import { UsersList } from "./UsersList";
import { useUsers } from "@/hooks/useUsers";
import { PageLayout } from "..";
import LoadingPage from "@/LoadingPage";

const Users = () => {
  const { data, isError, isLoading, update } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isError) {
    return (
      <ErrorPage title={"Something went wrong while projects loading..."} />
    );
  }

  return (
    <PageLayout
      title="Users"
      actions={[
        {
          id: 1,
          name: "Create User",
          onClick: () => setIsModalOpen(true),
        },
      ]}
      content={
        <>
          {isLoading ? (
            <LoadingPage title="Loading users..." />
          ) : (
            <UsersList users={data} />
          )}
        </>
      }
    />
  );
};

export default Users;
