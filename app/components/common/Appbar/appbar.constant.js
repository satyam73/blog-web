import { Home, Article, AccountCircle, Dashboard, MoreVert } from "@mui/icons-material";

export const APPBAR_ITEMS = [
  {
    name: 'dashboard',
    text: 'Dashboard',
    link: '/dashboard',
    icon: <Dashboard />
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