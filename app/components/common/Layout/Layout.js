import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { handleLoginModalChange, handleProfileModalChange, handleRegisterModalChange, handleUnauthorizeModalChange } from "@/app/store/global";

import Navbar from "@/app/components/common/Navbar";
import Appbar from "@/app/components/common/Appbar/Appbar";
import LoginModal from "@/app/components/LoginModal/LoginModal";
import ProfileModal from "@/app/components/ProfileModal/ProfileModal";
import RegisterModal from "@/app/components/RegisterModal/RegisterModal";
import UnauthorizeModal from "@/app/components/common/UnauthorizeModal/UnauthorizeModal";

export default function Layout({ children }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isUnauthorizeModalOpen, isLoginModalOpen, isRegisterModalOpen, isProfileModalOpen } = useSelector((state) => state.global);
  function closeUnauthorizeModal(e) {
    e?.stopPropagation();
    dispatch(handleUnauthorizeModalChange(false));
  }

  function onLoginClick(e) {
    dispatch(handleLoginModalChange(true));
    dispatch(handleUnauthorizeModalChange(false));
  }

  function onLoginButtonClick() {
    dispatch(handleLoginModalChange(true))
  }

  function closeRegisterModal(e) {
    e?.stopPropagation();
    dispatch(handleRegisterModalChange(false))
  }

  function closeLoginModal(e) {
    e?.stopPropagation();
    dispatch(handleLoginModalChange(false));
  }

  function closeProfileModal(e) {
    e?.stopPropagation();
    dispatch(handleProfileModalChange(false));
  }

  return (
    <>
      <UnauthorizeModal open={isUnauthorizeModalOpen} handleClose={closeUnauthorizeModal} onLoginClick={onLoginClick} />
      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} openLoginModal={onLoginButtonClick} />
      <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} />

      <ProfileModal open={isProfileModalOpen} handleClose={closeProfileModal} />
      {!isMobile && <Navbar />}
      {children}
      {isMobile && <Appbar activePage={activePage} setActivePage={setActivePage} />}
    </>
  )
}