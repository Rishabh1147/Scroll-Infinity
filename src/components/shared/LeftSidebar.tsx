import  { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesandmutation'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constant'
import { INavLink } from '@/types'


const LeftSidebar = () => {
  const {pathname} = useLocation();
  const {mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);
  return (
    <nav className= "leftsidebar">
      <div className="flex flex-col gap-11">
            <Link to = "/" className="flex gap-3 item-center">
                <img
                src= "/assets/images/logo.svg"
                alt="logo"
                width={170}
                height={36}
                />
            </Link>
            <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
              <img 
                src= {user.imageURL || "/assets/icons/profile-placeholder.svg"} 
                alt="profile" 
                className='h-14 w-14 rounded-full'
              />
              <div className="flex flex-col">
                <p className="body-bold">{user.name}</p>
                <p className="small-regular textlight-3">@{user.username}</p>
              </div>
            </Link>
            <ul className="flex flex-col gap-6">
              {sidebarLinks.map((link: INavLink ) => {
                const isActive = pathname === link.route;
                return (
                  <li key ={link.label} className={`leftsidebar-link group ${
                    isActive && 'bg-primary-500'
                  }`}>
                    <NavLink
                    to ={link.route}
                    className="flex gap-4 items-center p-4"

                    >
                      <img 
                        src={link.imgURL} 
                        alt={link.label} 
                        className={`group-hover:invert-white ${
                          isActive && 'invert-white'
                        }`}/>
                
                      {link.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
      </div>
      <Button variant="ghost" className="shad-button_ghost" onClick = {() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="sm:medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar
