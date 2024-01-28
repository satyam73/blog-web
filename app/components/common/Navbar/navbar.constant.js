import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
export const NAVBAR_ITEMS = [
  {
    name: 'home',
    text: 'Home',
    link: '/',
    isProtected: false
  },
  {
    name: 'blogs',
    text: 'Blogs',
    link: '/blogs',
    isProtected: false
  },
  {
    name: 'profile',
    text: 'Profile',
    link: '/profile',
    component: <AccountCircleIcon fontSize='inherit' />,
    isProtected: true
  },
]