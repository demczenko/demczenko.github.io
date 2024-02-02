import UserCart from "./UserCart";

export const UsersList = ({ users }) => {
  console.log(users);
  return (
    <>
      {users.map((user) => (
        <UserCart key={user.id} user={user} />
      ))}
    </>
  );
};
