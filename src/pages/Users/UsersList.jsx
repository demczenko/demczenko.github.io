import UserCart from "./UserCart";

export const UsersList = ({ actions, users }) => {
  return (
    <>
      {users.map((user) => (
        <UserCart key={user.id} user={user} />
      ))}
    </>
  );
};
