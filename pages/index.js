import { Box, Button, Typography } from '@mui/material'
import styles from '../styles/index.module.css'
import { Montserrat } from 'next/font/google';
import Layout from '@/app/components/common/Layout/Layout';
import { useState } from 'react';
import RegisterModal from '@/app/components/RegisterModal/RegisterModal';
import LoginModal from '@/app/components/LoginModal/LoginModal';
import HomePresentation from '@/app/components/home/HomePresentation';

const montserrat = Montserrat({ subsets: ['latin'] });
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
        <Button variant="contained" onClick={onRegisterButtonClick} > Register</Button>
        <Button variant="contained" onClick={onLoginButtonClick}> Login</Button>
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