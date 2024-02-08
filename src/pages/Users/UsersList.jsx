import { List } from "@/components";
import UserCart from "./UserCart";

export const UsersList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <UserCart key={user.id} user={user} />
      ))}
    </List>
  );
};
