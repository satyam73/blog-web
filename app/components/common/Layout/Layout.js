import { useTheme } from "@emotion/react";
import Navbar from "../Navbar/Navbar";
import { useMediaQuery } from "@mui/material";
import Appbar from "../Appbar/Appbar";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMobile && < Navbar />}
      {children}
      {isMobile && <Appbar />}
    </>
  )
}