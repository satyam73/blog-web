[1mdiff --git a/app/Contexts/UserProvider.js b/app/Contexts/UserProvider.js[m
[1mindex 0878cd8..28fb7ce 100644[m
[1m--- a/app/Contexts/UserProvider.js[m
[1m+++ b/app/Contexts/UserProvider.js[m
[36m@@ -14,7 +14,8 @@[m [mexport const useUser = () => useContext(UserContext);[m
 export default function UserProvider({ children }) {[m
   const [user, setUser] = useState(null);[m
   const [loading, setLoading] = useState(true);[m
[31m-  const [userDataFirebase, setUserDataFirebase] = useState(null)[m
[32m+[m[32m  const [userDataFirebase, setUserDataFirebase] = useState(null);[m
[32m+[m
   useEffect(() => {[m
     const unsubscribe = onAuthStateChanged(auth, (user) => {[m
       if (user) {[m
[1mdiff --git a/app/components/ProfileCard/ProfileCard.js b/app/components/ProfileCard/ProfileCard.js[m
[1mindex c67e6fb..350cd18 100644[m
[1m--- a/app/components/ProfileCard/ProfileCard.js[m
[1m+++ b/app/components/ProfileCard/ProfileCard.js[m
[36m@@ -1,13 +1,23 @@[m
 import { useUser } from '@/app/contexts/UserProvider';[m
[31m-import { Box, Typography } from '@mui/material';[m
[32m+[m[32mimport { Box, Button, Typography } from '@mui/material';[m
 import Image from 'next/image';[m
[31m-import Link from 'next/link';[m
 import styles from './profileCard.module.css';[m
[32m+[m[32mimport { handleLoginModalChange, handleProfileModalChange, handleUnauthorizeModalChange } from '@/app/store/global';[m
[32m+[m[32mimport { useDispatch, useSelector } from 'react-redux';[m
 [m
 export default function ProfileCard() {[m
[32m+[m[32m  const dispatch = useDispatch();[m
   const { user, userDataFirebase, loading } = useUser();[m
[31m-  console.log(user, userDataFirebase, loading);[m
[32m+[m[32m  const { isUnauthorizeModalOpen } = useSelector((state) => state.global);[m
 [m
[32m+[m[32m  function openLoginModal() {[m
[32m+[m[32m    dispatch(handleLoginModalChange(true));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  function openProfileModal() {[m
[32m+[m[32m    dispatch(handleProfileModalChange(true));[m
[32m+[m[32m  }[m
[32m+[m[32m  const unauthorizeModalOpenOrEditProfileCallback = !user ? openLoginModal : openProfileModal;[m
   //TODO add skeleton here[m
   if (loading) return;[m
   return ([m
[36m@@ -26,11 +36,11 @@[m [mexport default function ProfileCard() {[m
       <Typography className={styles['profile-card__bio']}>[m
         {userDataFirebase?.bio || ''}[m
       </Typography>[m
[31m-      <Link href='/profile'>[m
[32m+[m[32m      <Button variant='text' onClick={unauthorizeModalOpenOrEditProfileCallback}>[m
         <Typography className={styles['profile-card__edit-link']}>[m
           {!user ? 'Login' : 'Edit Profile'}[m
         </Typography>[m
[31m-      </Link>[m
[32m+[m[32m      </Button>[m
     </Box>[m
   );[m
 }[m
[1mdiff --git a/app/components/common/Appbar/Appbar.js b/app/components/common/Appbar/Appbar.js[m
[1mindex 45bccf9..65befa4 100644[m
[1m--- a/app/components/common/Appbar/Appbar.js[m
[1m+++ b/app/components/common/Appbar/Appbar.js[m
[36m@@ -6,14 +6,18 @@[m [mimport ProfileModal from "../../ProfileModal/ProfileModal";[m
 import AppbarPresentation from "./AppbarPresentation";[m
 import { useState } from "react";[m
 import signoutHandler from "@/app/firebase/auth/signout";[m
[32m+[m[32mimport { useDispatch, useSelector } from "react-redux";[m
[32m+[m[32mimport { handleProfileModalChange } from "@/app/store/global";[m
 [m
[31m-export default function Appbar({ activePage, setActivePage, isProfileModalOpen, setIsProfileModalOpen }) {[m
[32m+[m[32mexport default function Appbar({ activePage, setActivePage, }) {[m
   const router = useRouter();[m
   const [anchorEl, setAnchorEl] = useState(null);[m
   const isMenuOpen = Boolean(anchorEl);[m
[32m+[m[32m  const { isProfileModalOpen } = useSelector(state => state.global);[m
[32m+[m[32m  const dispatch = useDispatch();[m
 [m
   function handleClose() {[m
[31m-    setIsProfileModalOpen(false)[m
[32m+[m[32m    dispatch(handleProfileModalChange(false));[m
   }[m
 [m
   function onItemClick(item, index) {[m
[36m@@ -36,7 +40,7 @@[m [mexport default function Appbar({ activePage, setActivePage, isProfileModalOpen,[m
   };[m
 [m
   function onProfileClick() {[m
[31m-    setIsProfileModalOpen(true);[m
[32m+[m[32m    dispatch(handleProfileModalChange(true));[m
     handleMenuClose()[m
   }[m
 [m
[1mdiff --git a/app/components/common/Layout/Layout.js b/app/components/common/Layout/Layout.js[m
[1mindex 6ae2c78..3477392 100644[m
[1m--- a/app/components/common/Layout/Layout.js[m
[1m+++ b/app/components/common/Layout/Layout.js[m
[36m@@ -3,18 +3,50 @@[m [mimport { useTheme } from "@emotion/react";[m
 import { useMediaQuery } from "@mui/material";[m
 import Navbar from "../Navbar/Navbar";[m
 import Appbar from "../Appbar/Appbar";[m
[32m+[m[32mimport UnauthorizeModal from "../UnauthorizeModal/UnauthorizeModal";[m
[32m+[m[32mimport { useDispatch, useSelector } from "react-redux";[m
[32m+[m[32mimport { handleLoginModalChange, handleRegisterModalChange, handleUnauthorizeModalChange } from "@/app/store/global";[m
[32m+[m[32mimport RegisterModal from "../../RegisterModal/RegisterModal";[m
[32m+[m[32mimport LoginModal from "../../LoginModal/LoginModal";[m
 [m
 export default function Layout({ children }) {[m
   const theme = useTheme();[m
[31m-  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));[m
[32m+[m[32m  const dispatch = useDispatch();[m
   const [activePage, setActivePage] = useState(0);[m
[31m-  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);[m
[32m+[m[32m  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));[m
[32m+[m[32m  const { isUnauthorizeModalOpen, isLoginModalOpen, isRegisterModalOpen, isProfileModalOpen } = useSelector((state) => state.global);[m
[32m+[m[32m  function closeUnauthorizeModal(e) {[m
[32m+[m[32m    e?.stopPropagation();[m
[32m+[m[32m    dispatch(handleUnauthorizeModalChange(false));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  function onLoginClick(e) {[m
[32m+[m[32m    dispatch(handleLoginModalChange(true));[m
[32m+[m[32m    dispatch(handleUnauthorizeModalChange(false));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  function onLoginButtonClick() {[m
[32m+[m[32m    dispatch(handleLoginModalChange(true))[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  function closeRegisterModal(e) {[m
[32m+[m[32m    e?.stopPropagation();[m
[32m+[m[32m    dispatch(handleRegisterModalChange(false))[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  function closeLoginModal(e) {[m
[32m+[m[32m    e?.stopPropagation();[m
[32m+[m[32m    dispatch(handleLoginModalChange(false));[m
[32m+[m[32m  }[m
 [m
   return ([m
     <>[m
[31m-      {!isMobile && <Navbar isProfileModalOpen={isProfileModalOpen} setIsProfileModalOpen={setIsProfileModalOpen} />}[m
[32m+[m[32m      <UnauthorizeModal open={isUnauthorizeModalOpen} handleClose={closeUnauthorizeModal} onLoginClick={onLoginClick} />[m
[32m+[m[32m      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} openLoginModal={onLoginButtonClick} />[m
[32m+[m[32m      <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} />[m
[32m+[m[32m      {!isMobile && <Navbar />}[m
       {children}[m
[31m-      {isMobile && <Appbar activePage={activePage} setActivePage={setActivePage} isProfileModalOpen={isProfileModalOpen} setIsProfileModalOpen={setIsProfileModalOpen} />}[m
[32m+[m[32m      {isMobile && <Appbar activePage={activePage} setActivePage={setActivePage} />}[m
     </>[m
   )[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/app/components/common/Navbar/Navbar.js b/app/components/common/Navbar/Navbar.js[m
[1mindex b080783..a358c43 100644[m
[1m--- a/app/components/common/Navbar/Navbar.js[m
[1m+++ b/app/components/common/Navbar/Navbar.js[m
[36m@@ -1,13 +1,18 @@[m
 import { useState } from "react";[m
 import { useRouter } from "next/router";[m
[32m+[m[32mimport { useDispatch, useSelector } from "react-redux";[m
[32m+[m
[32m+[m[32mimport UserProvider from "@/app/contexts/UserProvider";[m
 import signoutHandler from "@/app/firebase/auth/signout";[m
[31m-import NavbarPresentation from "./NavbarPresentation";[m
[32m+[m[32mimport { handleProfileModalChange } from "@/app/store/global";[m
[32m+[m
 import ProfileModal from "@/app/components/ProfileModal/ProfileModal";[m
[31m-import UserProvider from "@/app/contexts/UserProvider";[m
[32m+[m[32mimport NavbarPresentation from "./NavbarPresentation";[m
 [m
[31m-export default function Navbar({ isProfileModalOpen, setIsProfileModalOpen }) {[m
[32m+[m[32mexport default function Navbar() {[m
   const [activeLinkIndex, setActiveLinkIndex] = useState(0);[m
[31m-[m
[32m+[m[32m  const { isProfileModalOpen } = useSelector(state => state.global);[m
[32m+[m[32m  const dispatch = useDispatch();[m
   const { push } = useRouter();[m
   async function onNavbarItemClick(index, item) {[m
     if (item.name === 'sign out') {[m
[36m@@ -16,7 +21,7 @@[m [mexport default function Navbar({ isProfileModalOpen, setIsProfileModalOpen }) {[m
     }[m
 [m
     if (item.name === 'profile') {[m
[31m-      setIsProfileModalOpen(true);[m
[32m+[m[32m      dispatch(handleProfileModalChange(true));[m
       return;[m
     }[m
 [m
[36m@@ -25,7 +30,7 @@[m [mexport default function Navbar({ isProfileModalOpen, setIsProfileModalOpen }) {[m
   }[m
 [m
   function handleClose() {[m
[31m-    setIsProfileModalOpen(false);[m
[32m+[m[32m    dispatch(handleProfileModalChange(false));[m
   }[m
 [m
   return ([m
[36m@@ -36,4 +41,4 @@[m [mexport default function Navbar({ isProfileModalOpen, setIsProfileModalOpen }) {[m
       </UserProvider>[m
     </>[m
   )[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m};[m
\ No newline at end of file[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 7b461a8..5aef94f 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -15,6 +15,7 @@[m
     "@emotion/styled": "^11.11.0",[m
     "@mui/icons-material": "^5.14.9",[m
     "@mui/material": "^5.14.10",[m
[32m+[m[32m    "@reduxjs/toolkit": "^2.0.1",[m
     "eslint": "8.49.0",[m
     "eslint-config-next": "13.5.2",[m
     "firebase": "^10.4.0",[m
[36m@@ -25,7 +26,8 @@[m
     "react-dom": "18.2.0",[m
     "react-froala-wysiwyg": "^4.1.3",[m
     "react-html-parser": "^2.0.2",[m
[31m-    "react-image-crop": "^11.0.5"[m
[32m+[m[32m    "react-image-crop": "^11.0.5",[m
[32m+[m[32m    "react-redux": "^9.1.0"[m
   },[m
   "devDependencies": {[m
     "@testing-library/jest-dom": "^6.1.3",[m
[1mdiff --git a/pages/_app.js b/pages/_app.js[m
[1mindex 9f2f624..1599252 100644[m
[1m--- a/pages/_app.js[m
[1m+++ b/pages/_app.js[m
[36m@@ -1,17 +1,21 @@[m
[32m+[m[32mimport { Provider } from 'react-redux'[m
 import ThemeProvider from '@/app/contexts/ThemeProvider'[m
 import { Montserrat } from 'next/font/google';[m
 import ToastProvider from '@/app/contexts/ToastProvider';[m
 import Loader from '@/app/components/Loader/Loader';[m
[32m+[m[32mimport { store } from '@/app/store/store'[m
 import '../styles/globals.css';[m
 const montserrat = Montserrat({ subsets: ['latin'] });[m
 export default function MyApp({ Component, pageProps }) {[m
   const getLayout = Component.getLayout || ((page) => page);[m
   return ([m
[31m-    <ThemeProvider>[m
[31m-      <ToastProvider>[m
[31m-        {getLayout(<Component {...pageProps} className={montserrat.className} />)}[m
[31m-        <Loader />[m
[31m-      </ToastProvider>[m
[31m-    </ThemeProvider>[m
[32m+[m[32m    <Provider store={store}>[m
[32m+[m[32m      <ThemeProvider>[m
[32m+[m[32m        <ToastProvider>[m
[32m+[m[32m          {getLayout(<Component {...pageProps} className={montserrat.className} />)}[m
[32m+[m[32m          <Loader />[m
[32m+[m[32m        </ToastProvider>[m
[32m+[m[32m      </ThemeProvider>[m
[32m+[m[32m    </Provider>[m
   )[m
 }[m
[1mdiff --git a/pages/index.js b/pages/index.js[m
[1mindex ea7791a..d4f1581 100644[m
[1m--- a/pages/index.js[m
[1m+++ b/pages/index.js[m
[36m@@ -7,36 +7,21 @@[m [mimport LoginModal from '@/app/components/LoginModal/LoginModal';[m
 import HomePresentation from '@/app/components/home/HomePresentation';[m
 [m
 import styles from '../styles/index.module.css';[m
[32m+[m[32mimport { handleLoginModalChange, handleRegisterModalChange } from '@/app/store/global';[m
[32m+[m[32mimport { useDispatch, useSelector } from 'react-redux';[m
 [m
 export default function Home() {[m
[31m-  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);[m
[31m-  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);[m
[32m+[m[32m  const dispatch = useDispatch();[m
 [m
   function onRegisterButtonClick() {[m
[31m-    setIsRegisterModalOpen(true);[m
[32m+[m[32m    dispatch(handleRegisterModalChange(true))[m
   }[m
 [m
[31m-  function onLoginButtonClick() {[m
[31m-    setIsLoginModalOpen(true);[m
[31m-  }[m
[31m-[m
[31m-  function closeRegisterModal(e) {[m
[31m-    e?.stopPropagation();[m
[31m-    setIsRegisterModalOpen(false);[m
[31m-  }[m
 [m
[31m-  function closeLoginModal(e) {[m
[31m-    e?.stopPropagation();[m
[31m-    setIsLoginModalOpen(false);[m
[31m-  }[m
   return ([m
[31m-    <>[m
[31m-      <Box className={styles.home} data-testid={'home-heading'} >[m
[31m-        <HomePresentation onJoinButtonClick={onRegisterButtonClick} />[m
[31m-      </Box>[m
[31m-      <RegisterModal open={isRegisterModalOpen} handleClose={closeRegisterModal} openLoginModal={onLoginButtonClick} />[m
[31m-      <LoginModal open={isLoginModalOpen} handleClose={closeLoginModal} />[m
[31m-    </>[m
[32m+[m[32m    <Box className={styles.home} data-testid={'home-heading'} >[m
[32m+[m[32m      <HomePresentation onJoinButtonClick={onRegisterButtonClick} />[m
[32m+[m[32m    </Box>[m
   )[m
 }[m
 [m
[1mdiff --git a/yarn.lock b/yarn.lock[m
[1mindex 6712e7f..8230b54 100644[m
[1m--- a/yarn.lock[m
[1m+++ b/yarn.lock[m
[36m@@ -1365,6 +1365,16 @@[m
   resolved "https://registry.yarnpkg.com/@protobufjs/utf8/-/utf8-1.1.0.tgz#a777360b5b39a1a2e5106f8e858f2fd2d060c570"[m
   integrity sha512-Vvn3zZrhQZkkBE8LSuW3em98c0FwgO4nxzv6OdSxPKJIEKY2bGbHn+mhGIPerzI4twdxaP8/0+06HBpwf345Lw==[m
 [m
[32m+[m[32m"@reduxjs/toolkit@^2.0.1":[m[41m[m
[32m+[m[32m  version "2.0.1"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/@reduxjs/toolkit/-/toolkit-2.0.1.tgz#0a5233c1e35c1941b03aece39cceade3467a1062"[m[41m[m
[32m+[m[32m  integrity sha512-fxIjrR9934cmS8YXIGd9e7s1XRsEU++aFc9DVNMFMRTM5Vtsg2DCRMj21eslGtDt43IUf9bJL3h5bwUlZleibA==[m[41m[m
[32m+[m[32m  dependencies:[m[41m[m
[32m+[m[32m    immer "^10.0.3"[m[41m[m
[32m+[m[32m    redux "^5.0.0"[m[41m[m
[32m+[m[32m    redux-thunk "^3.1.0"[m[41m[m
[32m+[m[32m    reselect "^5.0.1"[m[41m[m
[32m+[m[41m[m
 "@rushstack/eslint-patch@^1.3.3":[m
   version "1.4.0"[m
   resolved "https://registry.yarnpkg.com/@rushstack/eslint-patch/-/eslint-patch-1.4.0.tgz#77e948b9760bd22736a5d26e335a690f76fda37b"[m
[36m@@ -1581,6 +1591,11 @@[m
   resolved "https://registry.yarnpkg.com/@types/trusted-types/-/trusted-types-2.0.7.tgz#baccb07a970b91707df3a3e8ba6896c57ead2d11"[m
   integrity sha512-ScaPdn1dQczgbl0QFTeTOmVHFULt394XJgOQNoyVhZ6r2vLnMLJfBPd53SB52T/3G36VI1/g2MZaX0cwDuXsfw==[m
 [m
[32m+[m[32m"@types/use-sync-external-store@^0.0.3":[m[41m[m
[32m+[m[32m  version "0.0.3"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/@types/use-sync-external-store/-/use-sync-external-store-0.0.3.tgz#b6725d5f4af24ace33b36fafd295136e75509f43"[m[41m[m
[32m+[m[32m  integrity sha512-EwmlvuaxPNej9+T4v5AuBPJa2x2UOJVdjCtDHgcDqitUeOtjnJKJ+apYjVcAoBEMjKW1VVFGZLUb5+qqa09XFA==[m[41m[m
[32m+[m[41m[m
 "@types/yargs-parser@*":[m
   version "21.0.0"[m
   resolved "https://registry.yarnpkg.com/@types/yargs-parser/-/yargs-parser-21.0.0.tgz#0c60e537fa790f5f9472ed2776c2b71ec117351b"[m
[36m@@ -3339,6 +3354,11 @@[m [mignore@^5.2.0:[m
   resolved "https://registry.yarnpkg.com/ignore/-/ignore-5.2.4.tgz#a291c0c6178ff1b960befe47fcdec301674a6324"[m
   integrity sha512-MAb38BcSbH0eHNBxn7ql2NH/kX33OkB3lZ1BNdh7ENeRChHTYsTvWrMubiIAMNS2llXEEgZ1MUOBtXChP3kaFQ==[m
 [m
[32m+[m[32mimmer@^10.0.3:[m[41m[m
[32m+[m[32m  version "10.0.3"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/immer/-/immer-10.0.3.tgz#a8de42065e964aa3edf6afc282dfc7f7f34ae3c9"[m[41m[m
[32m+[m[32m  integrity sha512-pwupu3eWfouuaowscykeckFmVTpqbzW+rXFCX8rQLkZzM9ftBmU/++Ra+o+L27mz03zJTlyV4UUr+fdKNffo4A==[m[41m[m
[32m+[m[41m[m
 import-fresh@^3.2.1:[m
   version "3.3.0"[m
   resolved "https://registry.yarnpkg.com/import-fresh/-/import-fresh-3.3.0.tgz#37162c25fcb9ebaa2e6e53d5b4d88ce17d9e0c2b"[m
[36m@@ -4790,6 +4810,14 @@[m [mreact-is@^18.0.0, react-is@^18.2.0:[m
   resolved "https://registry.yarnpkg.com/react-is/-/react-is-18.2.0.tgz#199431eeaaa2e09f86427efbb4f1473edb47609b"[m
   integrity sha512-xWGDIW6x921xtzPkhiULtthJHoJvBbF3q26fzloPCK0hsvxtPVelvftw3zjbHWSkR2km9Z+4uxbDDK/6Zw9B8w==[m
 [m
[32m+[m[32mreact-redux@^9.1.0:[m[41m[m
[32m+[m[32m  version "9.1.0"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/react-redux/-/react-redux-9.1.0.tgz#46a46d4cfed4e534ce5452bb39ba18e1d98a8197"[m[41m[m
[32m+[m[32m  integrity sha512-6qoDzIO+gbrza8h3hjMA9aq4nwVFCKFtY2iLxCtVT38Swyy2C/dJCGBXHeHLtx6qlg/8qzc2MrhOeduf5K32wQ==[m[41m[m
[32m+[m[32m  dependencies:[m[41m[m
[32m+[m[32m    "@types/use-sync-external-store" "^0.0.3"[m[41m[m
[32m+[m[32m    use-sync-external-store "^1.0.0"[m[41m[m
[32m+[m[41m[m
 react-transition-group@^4.4.5:[m
   version "4.4.5"[m
   resolved "https://registry.yarnpkg.com/react-transition-group/-/react-transition-group-4.4.5.tgz#e53d4e3f3344da8521489fbef8f2581d42becdd1"[m
[36m@@ -4824,6 +4852,16 @@[m [mredent@^3.0.0:[m
     indent-string "^4.0.0"[m
     strip-indent "^3.0.0"[m
 [m
[32m+[m[32mredux-thunk@^3.1.0:[m[41m[m
[32m+[m[32m  version "3.1.0"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/redux-thunk/-/redux-thunk-3.1.0.tgz#94aa6e04977c30e14e892eae84978c1af6058ff3"[m[41m[m
[32m+[m[32m  integrity sha512-NW2r5T6ksUKXCabzhL9z+h206HQw/NJkcLm1GPImRQ8IzfXwRGqjVhKJGauHirT0DAuyy6hjdnMZaRoAcy0Klw==[m[41m[m
[32m+[m[41m[m
[32m+[m[32mredux@^5.0.0:[m[41m[m
[32m+[m[32m  version "5.0.1"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/redux/-/redux-5.0.1.tgz#97fa26881ce5746500125585d5642c77b6e9447b"[m[41m[m
[32m+[m[32m  integrity sha512-M9/ELqF6fy8FwmkpnF0S3YKOqMyoWJ4+CS5Efg2ct3oY9daQvd/Pc71FpGZsVsbl3Cpb+IIcjBDUnnyBdQbq4w==[m[41m[m
[32m+[m[41m[m
 reflect.getprototypeof@^1.0.4:[m
   version "1.0.4"[m
   resolved "https://registry.yarnpkg.com/reflect.getprototypeof/-/reflect.getprototypeof-1.0.4.tgz#aaccbf41aca3821b87bb71d9dcbc7ad0ba50a3f3"[m
[36m@@ -4865,6 +4903,11 @@[m [mrequires-port@^1.0.0:[m
   resolved "https://registry.yarnpkg.com/requires-port/-/requires-port-1.0.0.tgz#925d2601d39ac485e091cf0da5c6e694dc3dcaff"[m
   integrity sha512-KigOCHcocU3XODJxsu8i/j8T9tzT4adHiecwORRQ0ZZFcp7ahwXuRU1m+yuO90C5ZUyGeGfocHDI14M3L3yDAQ==[m
 [m
[32m+[m[32mreselect@^5.0.1:[m[41m[m
[32m+[m[32m  version "5.1.0"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/reselect/-/reselect-5.1.0.tgz#c479139ab9dd91be4d9c764a7f3868210ef8cd21"[m[41m[m
[32m+[m[32m  integrity sha512-aw7jcGLDpSgNDyWBQLv2cedml85qd95/iszJjN988zX1t7AVRJi19d9kto5+W7oCfQ94gyo40dVbT6g2k4/kXg==[m[41m[m
[32m+[m[41m[m
 resolve-cwd@^3.0.0:[m
   version "3.0.0"[m
   resolved "https://registry.yarnpkg.com/resolve-cwd/-/resolve-cwd-3.0.0.tgz#0f0075f1bb2544766cf73ba6a6e2adfebcb13f2d"[m
[36m@@ -5408,6 +5451,11 @@[m [murl-parse@^1.5.3:[m
     querystringify "^2.1.1"[m
     requires-port "^1.0.0"[m
 [m
[32m+[m[32muse-sync-external-store@^1.0.0:[m[41m[m
[32m+[m[32m  version "1.2.0"[m[41m[m
[32m+[m[32m  resolved "https://registry.yarnpkg.com/use-sync-external-store/-/use-sync-external-store-1.2.0.tgz#7dbefd6ef3fe4e767a0cf5d7287aacfb5846928a"[m[41m[m
[32m+[m[32m  integrity sha512-eEgnFxGQ1Ife9bzYs6VLi8/4X6CObHMw9Qr9tPY43iKwsPw8xE8+EFsf/2cFZ5S3esXgpWgtSCtLNS41F+sKPA==[m[41m[m
[32m+[m[41m[m
 util-deprecate@^1.0.1:[m
   version "1.0.2"[m
   resolved "https://registry.yarnpkg.com/util-deprecate/-/util-deprecate-1.0.2.tgz#450d4dc9fa70de732762fbd2d4a28981419a0ccf"[m
