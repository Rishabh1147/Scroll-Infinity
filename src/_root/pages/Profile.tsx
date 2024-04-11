import { useUserContext } from '@/context/AuthContext';
import { useGetUserById } from '@/lib/react-query/queriesandmutation';
import { useParams } from 'react-router-dom';

interface StatBlockProps{
  value: string | number;
  label: string;
}

const StatBlock = ({value , label}: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg: body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>

  </div>
);

const Profile = () => {

  const {id}  = useParams()
  const { user } = useUserContext();

  const {data: currentUser} = useGetUserById(id || " ")

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src= { currentUser?.imageURL||"/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md: mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser?.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser?.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20 ">
              <StatBlock value ={currentUser?.posts.length} label= "Posts"/>
              <StatBlock value ={20} label= "Followers"/>
              <StatBlock value ={20} label= "Following"/>

            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Profile
