import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from "../UserMenu/UserMenu";
import { UserContext } from "../../Context/userContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/Api";
import { Link, NavLink } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
const Header = () => {
  const { loginWithRedirect, isAuthenticated, user, logout,getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user,token),
  });
  const [menuOpened, setMenuOpened] = useState(false);
  useEffect(() => {
    const getTokenAndRegister = async()=>{
      const res = await getAccessTokenSilently();
      console.log(res)
      localStorage.setItem("access_token",res)
      setUserDetails((prev)=>({...prev,token:res}))
      mutate(res)
    }
    if (isAuthenticated && user?.email) {
      getTokenAndRegister()

    }
  }, [isAuthenticated, user, mutate]);
  const getMenuStype = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logo-1.png" alt="logo image" className="icon" />
        </Link>
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStype(menuOpened)}>
            <NavLink to="/properties">All Properties</NavLink>
            <NavLink to="/agent" target="_blank">
              <u>login as agent?</u>
            </NavLink>

            {!isAuthenticated ? (
            <NavLink to="/login">
              <button className="button" >
                <a href=""> login</a>
              </button>
            </NavLink>
                
            ) : (
              <UserMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
