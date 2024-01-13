import { useState } from "react"
import AppbarPresentation from "./AppbarPresentation";

export default function Appbar() {
  const [activePage, setActivePage] = useState(0);
  function onItemClick(index) {
    setActivePage(index);
  }

  return (
    <AppbarPresentation activePage={activePage} onItemClick={onItemClick} />
  )
}