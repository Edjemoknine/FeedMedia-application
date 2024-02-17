import ProfileCard from "@/components/shared/ProfileCard";
import { getProfile } from "@/lib/actions/createUser";
import React from "react";

const Followers = async({params:{id}}) => {
    const userProfile = await getProfile(id);
  
  return (
    <div>
      <ProfileCard userProfile={userProfile} />
    </div>
  );
};

export default Followers;
