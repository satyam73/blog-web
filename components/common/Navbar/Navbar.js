import { useState } from "react";
import { useRouter } from "next/router";
import signoutHandler from "@/firebase/auth/signout";
import NavbarPresentation from "./NavbarPresentation";

export default function Navbar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const { push } = useRouter();
  async function onNavbarItemClick(index, item) {
    if (item.name === 'sign out') {
      signoutHandler();
      return;
    }

    setActiveLinkIndex(index);
    push(item.link);
  }
  return (
    <NavbarPresentation activeLinkIndex={activeLinkIndex} onNavbarItemClick={onNavbarItemClick} />
  )
}