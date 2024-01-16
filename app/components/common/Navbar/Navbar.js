import { useState } from "react";
import { useRouter } from "next/router";
import signoutHandler from "@/app/firebase/auth/signout";
import NavbarPresentation from "./NavbarPresentation";
import ProfileModal from "@/app/components/ProfileModal/ProfileModal";

export default function Navbar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(true);
  const { push } = useRouter();
  async function onNavbarItemClick(index, item) {
    if (item.name === 'sign out') {
      signoutHandler();
      return;
    }

    if (item.name === 'profile') {
      setIsProfileModalVisible(true);
    }

    setActiveLinkIndex(index);
    push(item.link);
  }

  function handleClose() {
    setIsProfileModalVisible(false);
  }

  return (
    <>
      <ProfileModal open={isProfileModalVisible} handleClose={handleClose} />
      <NavbarPresentation activeLinkIndex={activeLinkIndex} onNavbarItemClick={onNavbarItemClick} />
    </>
  )
}