import React from 'react'
import Link from 'next/link';
import Lottie from 'react-lottie';
import { Box } from '@mui/material';

import * as animationData from '@/lottie/page-not-found.json';

import Layout from '@/app/components/common/Layout/Layout';

import styles from '@/styles/404.module.css';

export default function PageNotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Layout>
      <Box className={styles['page-not-found']} >
        <Lottie options={defaultOptions} height={400} width={400} />
        <Link className={styles['page-not-found__button']} href={'/'}>Go to home</Link>
      </Box>
    </Layout>
  )
}