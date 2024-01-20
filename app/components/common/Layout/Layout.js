import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Appbar from "../Appbar/Appbar";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activePage, setActivePage] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      {!isMobile && <Navbar isProfileModalOpen={isProfileModalOpen} setIsProfileModalOpen={setIsProfileModalOpen} />}
      {children}
      {isMobile && <Appbar activePage={activePage} setActivePage={setActivePage} isProfileModalOpen={isProfileModalOpen} setIsProfileModalOpen={setIsProfileModalOpen} />}
    </>
  )
}