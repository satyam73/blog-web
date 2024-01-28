import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import signoutHandler from '@/app/firebase/auth/signout';
import {
  handleActiveNavbarItemChange,
  handleProfileModalChange,
} from '@/app/store/global';
import NavbarPresentation from './NavbarPresentation';

export default function Navbar() {
  const { activeNavbarItem } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  async function onNavbarItemClick(item, index) {
    if (item.name === 'signout') {
      signoutHandler();
      return;
    }

    if (item.name === 'profile') {
      dispatch(handleProfileModalChange(true));
      handleMenuClose();
      return;
    }
    dispatch(handleActiveNavbarItemChange(index));

    push(item.link);
    handleMenuClose();
  }

  function handleProfileClick(event, item, index) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <NavbarPresentation
      activeLinkIndex={activeNavbarItem}
      onNavbarItemClick={onNavbarItemClick}
      anchorEl={anchorEl}
      isMenuOpen={isMenuOpen}
      handleMenuClose={handleMenuClose}
      handleProfileClick={handleProfileClick}
    />
  );
}
