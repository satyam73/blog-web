import { useRouter } from "next/router";

import ProfileModal from "../../ProfileModal/ProfileModal";
import AppbarPresentation from "./AppbarPresentation";
import { useState } from "react";
import signoutHandler from "@/app/firebase/auth/signout";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveBottomBarItemChange, handleProfileModalChange } from "@/app/store/global";

export default function Appbar({ }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { isProfileModalOpen } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const { activeBottomBarItem: activePage } = useSelector(state => state.global);

  function handleClose() {
    dispatch(handleProfileModalChange(false));
  }

  function onItemClick(item, index) {
    dispatch(handleActiveBottomBarItemChange(index));

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
    dispatch(handleProfileModalChange(true));
    handleMenuClose()
  }

  function onSignoutClick() {
    signoutHandler();
  }

  return (
    <>
      <AppbarPresentation onSignoutClick={onSignoutClick} onProfileClick={onProfileClick} handleMoreClick={handleMoreClick} anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} activePage={activePage} onItemClick={onItemClick} />
      <ProfileModal open={isProfileModalOpen} handleClose={handleClose} />
    </>
  )
}