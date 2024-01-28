import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import signoutHandler from "@/app/firebase/auth/signout";
import { useToast } from "@/app/contexts/ToastProvider";
import { useUser } from "@/app/contexts/UserProvider";

import { handleActiveBottomBarItemChange, handleProfileModalChange } from "@/app/store/global";
import { INFO_MESSAGES, TOAST_TYPES } from "@/constants";

import AppbarPresentation from "./AppbarPresentation";
import ProfileModal from "../../ProfileModal/ProfileModal";

export default function Appbar({ }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { isProfileModalOpen } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const { activeBottomBarItem: activePage } = useSelector(state => state.global);
  const { user, loading: isUserLoading } = useUser();
  const { toast, showToast } = useToast()
  function handleClose() {
    dispatch(handleProfileModalChange(false));
  }

  function onItemClick(item, index) {
    dispatch(handleActiveBottomBarItemChange(index));

    if (index === 2) {
      if (!isUserLoading && !user) {
        return showToast({ ...toast, isVisible: true, text: INFO_MESSAGES.NOT_LOGGED_IN_MENU, type: TOAST_TYPES.SUCCESS });
      }
      return;
    }
    router.push(item.link);
    handleMenuClose();
  }

  function onMenuItemClick(item, index) {
    switch (item.name) {
      case 'profile':
        onProfileClick();
        break;
      case 'signout':
        onSignoutClick();
        break;
      default:
        onItemClick(item, index)
    }
  }

  function handleMoreClick(event, item, index) {

    if (!isUserLoading && !user) return;
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
      <AppbarPresentation onSignoutClick={onSignoutClick} onProfileClick={onProfileClick} handleMoreClick={handleMoreClick} anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={handleMenuClose} activePage={activePage} onItemClick={onItemClick} onMenuItemClick={onMenuItemClick} />
      <ProfileModal open={isProfileModalOpen} handleClose={handleClose} />
    </>
  )
}