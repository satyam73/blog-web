import { useRouter } from "next/router";

import UserProvider from "@/app/contexts/UserProvider";

import ProfileModal from "../../ProfileModal/ProfileModal";
import AppbarPresentation from "./AppbarPresentation";
import { useState } from "react";
import signoutHandler from "@/app/firebase/auth/signout";

export default function Appbar({ activePage, setActivePage, isProfileModalOpen, setIsProfileModalOpen }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleClose() {
    setIsProfileModalOpen(false)
  }

  function onItemClick(item, index) {
    setActivePage(index);

    if (index === 2) {
      return;
    }
    router.push(item.link)
  }


  function handleMoreClick(event, item, index) {
    setAnchorEl(event.currentTarget);
    onItemClick(item, index);
  };

  function handleMenuClose() {
    setAnchorEl(null);
  };

  function onProfileClick() {
    setIsProfileModalOpen(true);
    handleMenuClose()
  }

  function onSignoutClick() {
    signoutHandler();
  }

  return (
    <>
      <UserProvider>
        <AppbarPresentation onSignoutClick={onSignoutClick} onProfileClick={onProfileClick} handleMoreClick={handleMoreClick} anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} activePage={activePage} onItemClick={onItemClick} />
        <ProfileModal open={isProfileModalOpen} handleClose={handleClose} />
      </UserProvider>
    </>
  )
}