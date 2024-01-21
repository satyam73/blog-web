import { Provider } from 'react-redux'
import ThemeProvider from '@/app/contexts/ThemeProvider'
import { Montserrat } from 'next/font/google';
import ToastProvider from '@/app/contexts/ToastProvider';
import Loader from '@/app/components/Loader/Loader';
import { store } from '@/app/store/store'
import UserProvider from '@/app/contexts/UserProvider';
import '../styles/globals.css';
const montserrat = Montserrat({ subsets: ['latin'] });
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          {getLayout(<Component {...pageProps} className={montserrat.className} />)}
          <Loader />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  )
}
