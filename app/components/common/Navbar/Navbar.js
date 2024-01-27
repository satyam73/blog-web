import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import signoutHandler from "@/app/firebase/auth/signout";
import { handleActiveNavbarItemChange, handleProfileModalChange } from "@/app/store/global";
import NavbarPresentation from "./NavbarPresentation";

export default function Navbar() {
  const { activeNavbarItem } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const { push } = useRouter();

  async function onNavbarItemClick(index, item) {
    if (item.name === 'sign out') {
      signoutHandler();
      return;
    }

    if (item.name === 'profile') {
      dispatch(handleProfileModalChange(true));
      return;
    }
    dispatch(handleActiveNavbarItemChange(index));

    push(item.link);
  }

  return (
    <>
      <NavbarPresentation activeLinkIndex={activeNavbarItem} onNavbarItemClick={onNavbarItemClick} />
    </>
  )
};