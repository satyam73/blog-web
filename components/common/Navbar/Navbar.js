import { Box } from "@mui/material";
import NavbarPresentation from "./NavbarPresentation";
import { useState } from "react";
import { useRouter } from "next/router";
import { NAVBAR_ITEMS } from "./navbar.constant";

export default function Navbar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const { push } = useRouter();
  function onNavbarItemClick(index) {
    setActiveLinkIndex(index);
    const activePage = NAVBAR_ITEMS[index].link;
    push(activePage);
  }
  return (
    <NavbarPresentation activeLinkIndex={activeLinkIndex} onNavbarItemClick={onNavbarItemClick} />
  )
}