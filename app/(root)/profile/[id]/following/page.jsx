import ProfileCard from "@/components/shared/ProfileCard";
import UserCard from "@/components/shared/UserCard";
import { getProfile } from "@/lib/actions/createUser";
import React from "react";

const Following = async ({ params: { id } }) => {
  const userProfile = await getProfile(id);

  return (
    <div>
      <ProfileCard userProfile={userProfile} />
      <div>
        {userProfile?.following?.map((someone) => (
          <UserCard someone={someone} key={someone._id} />
        ))}
      </div>
    </div>
  );
};

export default Following;
