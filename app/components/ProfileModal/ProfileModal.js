import React, { useState } from 'react'
import ProfileModalPresentation from './ProfileModalPresentation'
import { useUser } from '@/app/contexts/UserProvider';

export default function ProfileModal({ open, handleClose }) {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const { user } = useUser();
  console.log(user);
  return (
    <ProfileModalPresentation open={open} handleClose={handleClose} isSubmitButtonDisabled={isSubmitButtonDisabled} user={user} />
  )
}