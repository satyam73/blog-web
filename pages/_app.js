import ThemeProvider from '@/app/contexts/ThemeProvider'
import '../styles/globals.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider>
      {getLayout(<Component {...pageProps} className={montserrat.className} />)}
    </ThemeProvider>
  )
}
