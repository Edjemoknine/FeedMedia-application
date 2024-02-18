import React from "react";
import UserCard from "./UserCard";
import { getUsers } from "@/lib/actions/createUser";

const getLoggedInUser = async (id) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await res.json();
  return data;
};
const SidbarRight = async () => {
  const { userId } = auth();
  const user = await getLoggedInUser(userId);

  const suggestedPeople = await getUsers();
  return (
    <div className="sticky mt-7 right-0 top-0 z-20 h-screen  flex flex-col w-[300px] xl:w-[350px] overflow-auto gap-12 pl-6 pr-10 max-lg:hidden">
      <div className="flex flex-col gap-4">
        <h4 className="text-white text-xl font-semibold">Following</h4>
        <div className="flex flex-col gap-4">
          {user?.following?.map((someone) => (
            <UserCard someone={someone} key={someone._id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-white text-xl font-semibold">Suggestions People</h4>
        <div className="flex flex-col gap-4">
          {suggestedPeople.map((user) => (
            <UserCard key={user._id} someone={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidbarRight;
