import { useState } from "react";
import { useRouter } from "next/router";
import firebaseApp from "@/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { NAVBAR_ITEMS } from "./navbar.constant";
import NavbarPresentation from "./NavbarPresentation";

export default function Navbar() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const auth = getAuth(firebaseApp);
  const { push } = useRouter();
  async function onNavbarItemClick(index, item) {
    if (item.name === 'sign out') {
      const signoutResult = await signOut(auth);
      console.log(signoutResult);
      return;
    }

    setActiveLinkIndex(index);
    const activePage = item.link;
    push(activePage);
  }
  return (
    <NavbarPresentation activeLinkIndex={activeLinkIndex} onNavbarItemClick={onNavbarItemClick} />
  )
}