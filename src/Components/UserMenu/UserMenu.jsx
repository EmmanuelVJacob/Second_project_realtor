import React from "react";
import { Avatar, Menu } from "@mantine/core";

const UserMenu = ({ user, logout }) => {
  return (
    <>
      <Menu>
        <Menu.Target>
        <Avatar src={user?.picture} alt="user Image" radius={"xl"} />
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item>
                Favourites
            </Menu.Item>
            <Menu.Item onClick={()=>{
                localStorage.clear()
                logout()
            }}>
                logout
            </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default UserMenu;
