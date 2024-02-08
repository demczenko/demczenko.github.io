import React, { useState } from "react";
import { UsersList } from "./UsersList";
import { useUsers } from "@/hooks/useUsers";
import PageContainer from "../PageContainer";
import { PlusCircle } from "lucide-react";

const Users = () => {
  const { data, isError, isLoading, update } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer
      action={{
        id: 1,
        name: "Create User",
        icon: <PlusCircle className="h-4 w-4 mr-2" />,
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
