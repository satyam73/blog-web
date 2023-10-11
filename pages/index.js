import { Box, Button, Typography } from '@mui/material'
import styles from '../styles/index.module.css'
import { Montserrat } from 'next/font/google';
import Layout from '@/components/common/Layout/Layout';
import { useState } from 'react';
import RegisterModal from '@/components/RegisterModal/RegisterModal';

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

  function closeRegisterModal() {
    setIsRegisterModalOpen(false);
  }
  return (
    <>
      <Box className={styles.home} data-testid={'home-heading'} >
        <Button variant="contained" onClick={onRegisterButtonClick} > Register</Button>
        <Button variant="contained" onClick={onLoginButtonClick}> Login</Button>
      </ Box>

      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} />
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