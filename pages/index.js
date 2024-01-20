import { useState } from 'react';
import { Box } from '@mui/material';

import Layout from '@/app/components/common/Layout/Layout';
import RegisterModal from '@/app/components/RegisterModal/RegisterModal';
import LoginModal from '@/app/components/LoginModal/LoginModal';
import HomePresentation from '@/app/components/home/HomePresentation';

import styles from '../styles/index.module.css';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  function onRegisterButtonClick() {
    setIsRegisterModalOpen(true);
  }

  function onLoginButtonClick() {
    setIsLoginModalOpen(true);
  }

  function closeRegisterModal(e) {
    e?.stopPropagation();
    setIsRegisterModalOpen(false);
  }

  function closeLoginModal(e) {
    e?.stopPropagation();
    setIsLoginModalOpen(false);
  }
  return (
    <>
      <Box className={styles.home} data-testid={'home-heading'} >
        <HomePresentation onJoinButtonClick={onRegisterButtonClick} />
      </Box>
      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} openLoginModal={onLoginButtonClick} />
      <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} />
    </>
  )
}


Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}