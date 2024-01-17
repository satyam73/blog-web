import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../common/Modal/Modal';
import InputBox from '../common/Input/InputBox';
import UpdateProfilePhoto from './UpdateProfilePhoto';
import styles from './profileModal.module.css';

export default function ProfileModalPresentation({
  open,
  handleClose,
  isSubmitButtonDisabled,
  user,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles['profile-modal']}>
        <IconButton
          className={styles['profile-modal__close-button']}
          onClick={handleClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>
        <Box className={styles['profile-modal__main']}>
          <Typography variant='h4' className={styles['profile-modal__heading']}>
            Profile Details
          </Typography>

          <Box className={styles['profile-modal__info']}>
            <UpdateProfilePhoto profilePic={user?.photoURL} />
            <InputBox
              value={user?.displayName}
              type={'text'}
              name={'Name'}
              placeholder={'name'}
              id={'name'}
              isValid={'true'}
              disabled={true}
            />
            <InputBox
              value={user?.email}
              type={'text'}
              name={'Email'}
              placeholder={'name'}
              id={'name'}
              isValid={'true'}
              disabled={true}
            />
            <label
              htmlFor={'bio'}
              className={styles['profile-modal__bio-label']}
            >
              Bio
            </label>
            <textarea
              className={styles['profile-modal__bio-textarea']}
              name=''
              id='bio'
              cols='30'
              rows='10'
              disabled={true}
              value={user?.bio}
            ></textarea>
          </Box>
        </Box>
        <Box className={styles['profile-modal__actions']}>
          <Button
            disabled={isSubmitButtonDisabled}
            variant='contained'
            className={styles['profile-modal__submit-button']}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
