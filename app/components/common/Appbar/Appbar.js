import { useState } from "react"
import AppbarPresentation from "./AppbarPresentation";
import ProfileModal from "../../ProfileModal/ProfileModal";

export default function Appbar() {
  const [activePage, setActivePage] = useState(0);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(true);

  function handleClose() {
    setIsProfileModalVisible(false)
  }
  function onItemClick(index) {
    setActivePage(index);

    if (index === 2) {
      setIsProfileModalVisible(true)
    }
  }

  return (
    <>
      <AppbarPresentation activePage={activePage} onItemClick={onItemClick} />
      <ProfileModal open={isProfileModalVisible} handleClose={handleClose} />
    </>
  )
}