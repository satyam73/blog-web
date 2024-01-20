import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Appbar from "../Appbar/Appbar";
import UnauthorizeModal from "../UnauthorizeModal/UnauthorizeModal";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginModalChange, handleRegisterModalChange, handleUnauthorizeModalChange } from "@/app/store/global";
import RegisterModal from "../../RegisterModal/RegisterModal";
import LoginModal from "../../LoginModal/LoginModal";

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

  return (
    <>
      <UnauthorizeModal open={isUnauthorizeModalOpen} handleClose={closeUnauthorizeModal} onLoginClick={onLoginClick} />
      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} openLoginModal={onLoginButtonClick} />
      <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} />
      {!isMobile && <Navbar />}
      {children}
      {isMobile && <Appbar activePage={activePage} setActivePage={setActivePage} />}
    </>
  )
}