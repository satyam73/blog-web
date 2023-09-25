import { Box } from "@mui/material";
import NavbarPresentation from "./NavbarPresentation";
import { useState } from "react";

export default function Navbar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  function onNavbarItemClick(index) {
    setActiveLinkIndex(index)
  }
  return (
    <NavbarPresentation activeLinkIndex={activeLinkIndex} onNavbarItemClick={onNavbarItemClick} />
  )
}