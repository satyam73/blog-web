import ThemeProvider from '@/Contexts/ThemeProvider'
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}
