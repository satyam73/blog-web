import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { handleLoginModalChange, handleProfileModalChange, handleRegisterModalChange, handleUnauthorizeModalChange } from "@/app/store/global";
import UserProvider from "@/app/contexts/UserProvider";

import Navbar from "@/app/components/common/Navbar/Navbar";
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

  function openLoginModal() {
    dispatch(handleLoginModalChange(true))
  }

  function openRegisterModal() {
    dispatch(handleRegisterModalChange(true))
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

  console.log('from layout ', isLoginModalOpen)
  return (
    <UserProvider>
      <UnauthorizeModal open={isUnauthorizeModalOpen} handleClose={closeUnauthorizeModal} />
      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} openLoginModal={openLoginModal} />
      <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} openRegisterModal={openRegisterModal} />
      <ProfileModal open={isProfileModalOpen} handleClose={closeProfileModal} />
      {!isMobile && <Navbar />}
      {children}
      {isMobile && <Appbar />}
    </UserProvider>
  )
}