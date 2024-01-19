import { useState } from "react";
import { useRouter } from "next/router";
import signoutHandler from "@/app/firebase/auth/signout";
import NavbarPresentation from "./NavbarPresentation";
import ProfileModal from "@/app/components/ProfileModal/ProfileModal";
import UserProvider from "@/app/contexts/UserProvider";

export default function Navbar({ isProfileModalOpen, setIsProfileModalOpen }) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  const { push } = useRouter();
  async function onNavbarItemClick(index, item) {
    if (item.name === 'sign out') {
      signoutHandler();
      return;
    }

    if (item.name === 'profile') {
      setIsProfileModalOpen(true);
      return;
    }

    setActiveLinkIndex(index);
    push(item.link);
  }

  function handleClose() {
    setIsProfileModalOpen(false);
  }

  return (
    <>
      <UserProvider>
        <ProfileModal open={isProfileModalOpen} handleClose={handleClose} />
        <NavbarPresentation activeLinkIndex={activeLinkIndex} onNavbarItemClick={onNavbarItemClick} />
      </UserProvider>
    </>
  )
}