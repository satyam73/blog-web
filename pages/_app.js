import ThemeProvider from '@/app/contexts/ThemeProvider'
import { Montserrat } from 'next/font/google';
import ToastProvider from '@/app/contexts/ToastProvider';
import '../styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider>
      <ToastProvider>
        {getLayout(<Component {...pageProps} className={montserrat.className} />)}
      </ToastProvider>
    </ThemeProvider>
  )
}
