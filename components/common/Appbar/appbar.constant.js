import { Home, Article, AccountCircle } from "@mui/icons-material";
export const APPBAR_ITEMS = [
  {
    name: 'home',
    text: 'Home',
    link: '/',
    icon: <Home />
  },
  {
    name: 'blogs',
    text: 'Blogs',
    link: '/blogs',
    icon: <Article />
  },
  {
    name: 'profile',
    text: 'Profile',
    link: '/profile',
    icon: <AccountCircle />
  },
]