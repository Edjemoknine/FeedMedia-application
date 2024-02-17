import ProfileCard from "@/components/shared/ProfileCard";
import UserCard from "@/components/shared/UserCard";
import { getProfile } from "@/lib/actions/createUser";
import React from "react";

const Followers = async ({ params: { id } }) => {
  const userProfile = await getProfile(id);

  return (
    <div>
      <ProfileCard userProfile={userProfile} />
      <div>
        {userProfile?.followers?.map((someone) => (
          <UserCard someone={someone} key={someone._id} />
        ))}
      </div>
    </div>
  );
};

export default Followers;
