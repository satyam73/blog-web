import { Typography } from '@mui/material'
import styles from '../styles/index.module.css'
import { Montserrat } from 'next/font/google';
import Layout from '@/components/common/Layout/Layout';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function Home() {
  return (
    <Typography className={styles.home} data-testid={'home-heading'} >
      Hello
    </ Typography>
  )
}


Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}