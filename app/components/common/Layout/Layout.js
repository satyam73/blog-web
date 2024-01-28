import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import { IconButton, useMediaQuery } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";

import { handleLoginModalChange, handleProfileModalChange, handleRegisterModalChange, handleUnauthorizeModalChange } from "@/app/store/global";
import UserProvider, { useUser } from "@/app/contexts/UserProvider";

import Navbar from "@/app/components/common/Navbar/Navbar";
import Appbar from "@/app/components/common/Appbar/Appbar";
import LoginModal from "@/app/components/LoginModal/LoginModal";
import ProfileModal from "@/app/components/ProfileModal/ProfileModal";
import RegisterModal from "@/app/components/RegisterModal/RegisterModal";
import UnauthorizeModal from "@/app/components/common/UnauthorizeModal/UnauthorizeModal";

export default function Layout({ children }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading: isUserLoading } = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isUnauthorizeModalOpen, isLoginModalOpen, isRegisterModalOpen, isProfileModalOpen } = useSelector((state) => state.global);
  const isFloatingCreatePostButtonVisible = ['/', '/blogs',].includes(router.pathname);

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

  return (
    <UserProvider>
      <UnauthorizeModal open={isUnauthorizeModalOpen} handleClose={closeUnauthorizeModal} />
      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} openLoginModal={openLoginModal} />
      <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} openRegisterModal={openRegisterModal} />
      <ProfileModal open={isProfileModalOpen} handleClose={closeProfileModal} />
      {!isMobile && <Navbar />}
      {children}
      {isMobile && <Appbar />}

      {(!isUserLoading && user && isFloatingCreatePostButtonVisible) && <IconButton sx={{ background: 'var(--secondary-color)', position: 'fixed', bottom: 'var(--navbar-height)', right: '50px', '&:hover': { background: 'var(--secondary-color)', opacity: 0.9 } }} aria-label="add" size="medium" onClick={() => router.push('/blogs/create-post')}>
        <AddIcon fontSize="inherit" sx={{ color: 'var(--primary-color)', '&:hover': { color: 'var(--primary-color)', } }} />
      </IconButton>}
    </UserProvider>
  )
}