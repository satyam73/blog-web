import { Home, Article, MoreVert } from "@mui/icons-material";

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
    name: 'more',
    text: 'More',
    link: 'javascript:void(0)',
    icon: <MoreVert />
  },
]
export const APPBAR_MENUS = [
  {
    name: 'dashboard',
    text: 'Dashboard',
  },
  {
    name: 'profile',
    text: 'Profile',
  },
  {
    name: 'signout',
    text: 'Signout',
  }
]