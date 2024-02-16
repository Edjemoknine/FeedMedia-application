import UserCard from "@/components/shared/UserCard";
import { getSearchUser } from "@/lib/actions/createUser";
import Link from "next/link";

const SearchPeople = async ({ params: { query } }) => {
  const searchPeople = await getSearchUser(query);
  console.log(searchPeople);

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex gap-3">
        <Link
          className="px-2.5 py-1.5 rounded-lg text-white text-sm bg-gray-600 hover:bg-gray-700 duration-300"
          href={`/search/posts/${query}`}
        >
          Posts
        </Link>
        <Link
          className="px-2.5 py-1.5 rounded-lg text-white text-sm bg-gray-600 hover:bg-gray-700 duration-300"
          href={`/search/people/${query}`}
        >
          People
        </Link>
      </div>

      <div>
        {searchPeople.map((someone) => (
          <UserCard someone={someone} key={someone._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPeople;
