import UserCard from "@/components/shared/UserCard";
import { getUsers } from "@/lib/actions/createUser";
import React from "react";

const People = async () => {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user._id} someone={user} />
      ))}
    </div>
  );
};

export default People;
