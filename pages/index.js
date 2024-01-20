import { useState } from 'react';
import { Box } from '@mui/material';

import Layout from '@/app/components/common/Layout/Layout';
import RegisterModal from '@/app/components/RegisterModal/RegisterModal';
import LoginModal from '@/app/components/LoginModal/LoginModal';
import HomePresentation from '@/app/components/home/HomePresentation';

import styles from '../styles/index.module.css';
import { handleLoginModalChange, handleRegisterModalChange } from '@/app/store/global';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  function onRegisterButtonClick() {
    dispatch(handleRegisterModalChange(true))
  }


  return (
    <Box className={styles.home} data-testid={'home-heading'} >
      <HomePresentation onJoinButtonClick={onRegisterButtonClick} />
    </Box>
  )
}


Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}