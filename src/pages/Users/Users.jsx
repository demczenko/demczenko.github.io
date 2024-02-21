import React, { useState } from "react";
import { UsersList } from "./UsersList";
import { useUsers } from "@/hooks/useUsers";
import PageContainer from "../PageContainer";
import { PlusCircle } from "lucide-react";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";

const Users = () => {
  const { data, isError, isLoading } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
<SkeletonCard  isContainer={true}/>
    );
  }

  if (isError) {
    return <ErrorPage title={`Something went wrong while users loading...`} />;
  }

  return (
    <PageContainer
      action={{
        id: 1,
        name: "Create User",
        icon: <PlusCircle className="h-4 w-4" />,
        onClick: () => setIsModalOpen(true),
      }}
      title={"Users"}
      isError={isError}
      isLoading={isLoading}>
      <UsersList users={data} />
    </PageContainer>
  );
};

export default Users;
