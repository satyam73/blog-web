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
    isProtected: true
  },
  {
    name: 'create-post',
    text: 'Create',
    link: '/blogs/create-post',
    isProtected: true
  },
  {
    name: 'dashboard',
    text: 'Dashboard',
    link: '/dashboard',
    isProtected: true
  },
  {
    name: 'sign out',
    text: 'Sign out',
    link: 'javascript:void(0)',
    isProtected: true,
  }
]