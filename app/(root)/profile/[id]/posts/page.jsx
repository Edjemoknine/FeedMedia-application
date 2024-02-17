import PostCard from "@/components/shared/PostCard";
import ProfileCard from "@/components/shared/ProfileCard";
import { getProfile } from "@/lib/actions/createUser";

const Profile = async ({ params: { id } }) => {
  const userProfile = await getProfile(id);

  return (
    <div>
      <ProfileCard userProfile={userProfile} />
      <div>
        {userProfile?.posts?.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
