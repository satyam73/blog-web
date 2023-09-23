import { Typography } from '@mui/material'
import styles from '../styles/index.module.css'
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function Home() {
  return (
    <Typography className={styles.home} data-testid={'home-heading'} >
      Hello
    </ Typography>
  )
}
