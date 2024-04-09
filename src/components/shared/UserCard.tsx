import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type userCardProps = {
    user: Models.Document;
}

const UserCard = ({ user }: userCardProps) => {
  return (
    <div className="border border-gray-900 rounded-lg p-4 flex flex-col justify-between">
        <Link to={`profile/${user.$id}`}>
            <img 
                src={user.imageURL || "assets/icons/people-placeholder.svg"} 
                alt="creator"
                className="rounded-full w-14 h-14 mx-auto" // Center the image horizontally
            />
            <div className="flex-center flex-col gap-1 mt-3">
                <p className="base-medium text-light-1 text-center line-clamp-1">{user.name}</p>

                <p className="small-regular text-light-3 text-center line-clamp-1">@{user.username}</p>
            </div>
        </Link>

        <Button type="button" size="sm" className="shad-button_primary px-5 mt-10"> {/* Center the button horizontally */}
            Follow
        </Button>
    </div>
  )
}

export default UserCard;
