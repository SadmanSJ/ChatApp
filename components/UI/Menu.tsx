import React from "react";
import LogoutButton from "../Buttons/LogoutButton";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

export default function Menu() {
  return (
    <div className="fixed backdrop-blur-2xl p-4 min-w-52 shadow-md rounded-xl">
      {/* {menuItems.map((m) => (
        <MenuItemComponent item={m} />
      ))} */}
      <LogoutButton />
    </div>
  );
}

const MenuItemComponent = ({ item }: { item: (typeof menuItems)[0] }) => {
  return (
    <button type="button" title={item.name}>
      {item.icon && item.icon}
      {item.name}
    </button>
  );
};

const menuItems = [
  { name: "Logout", onClick: signOut(), icon: <BiLogOut size={24} /> },
];
