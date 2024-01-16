import React from 'react'
import ProfileModalPresentation from './ProfileModalPresentation'

export default function ProfileModal({ open, handleClose, }) {
  return (
    <ProfileModalPresentation open={open} handleClose={handleClose} />
  )
}