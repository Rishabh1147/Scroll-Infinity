import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queriesandmutation";


const AllUsers = () => {

  const { toast } = useToast();

  const { data: creators, isPending, isError: isErrorCreators } = useGetUsers();
  const {user:currentUser}  = useUserContext();

  if(isErrorCreators) { toast({title: "Something went wrong"})}

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="flex gap-3">
          <img src="/assets/icons/people.svg" alt="people"  width={30} height={30} className="flex"/>
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>
        {isPending && !creators ? (
          <Loader/>
        )  : (
          <ul className="user-grid">
            {creators?.documents.filter(creator => creator?.$id !== currentUser.id).map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )
        }
      </div>
      
    </div>
  )
}

export default AllUsers
