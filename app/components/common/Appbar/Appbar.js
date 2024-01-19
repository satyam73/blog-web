import { useState } from "react"
import AppbarPresentation from "./AppbarPresentation";
import ProfileModal from "../../ProfileModal/ProfileModal";
import UserProvider from "@/app/contexts/UserProvider";
import AuthGuard from "../../AuthGuard/AuthGuard";

export default function Appbar({ isProfileModalOpen, setIsProfileModalOpen }) {
  const [activePage, setActivePage] = useState(0);

  function handleClose() {
    setIsProfileModalOpen(false)
  }

  function onItemClick(index) {
    setActivePage(index);

    if (index === 2) {
      setIsProfileModalOpen(true)
    }
  }

  return (
    <>
      <UserProvider>
        <AuthGuard>
          <AppbarPresentation activePage={activePage} onItemClick={onItemClick} />
          <ProfileModal open={isProfileModalOpen} handleClose={handleClose} />
        </AuthGuard>
      </UserProvider>
    </>
  )
}