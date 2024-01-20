import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import UserProvider from "@/app/contexts/UserProvider";
import signoutHandler from "@/app/firebase/auth/signout";
import { handleProfileModalChange } from "@/app/store/global";
import NavbarPresentation from "./NavbarPresentation";

export default function Navbar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const dispatch = useDispatch();
  const { push } = useRouter();

  async function onNavbarItemClick(index, item) {
    if (item.name === 'sign out') {
      signoutHandler();
      return;
    }

    if (item.name === 'profile') {
      dispatch(handleProfileModalChange(true));
      return;
    }

    setActiveLinkIndex(index);
    push(item.link);
  }

  return (
    <>
      <UserProvider>
        <NavbarPresentation activeLinkIndex={activeLinkIndex} onNavbarItemClick={onNavbarItemClick} />
      </UserProvider>
    </>
  )
};