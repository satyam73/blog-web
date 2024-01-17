import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import UpdateProfilePhoto from './UpdateProfilePhoto';
import InputBox from '../common/Input/InputBox';
import Modal from '../common/Modal/Modal';
import ImageCropper from './ImageCropper';

import styles from './profileModal.module.css';

export default function ProfileModalPresentation({
  open,
  handleClose,
  isSubmitButtonDisabled,
  user,
  isChangeProfileStep,
  setIsChangeProfileStep,
  setIsSubmitButtonDisabled,
  blobImageURL,
  setImage,
  onSubmitButtonClick,
  crop,
  setCrop,
  imageRef,
  setCompletedCrop,
  handleBack,
  isImageUploading,
  onRemoveProfileClick,
  isRemoveButtonLoading,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles['profile-modal']}>
        {isChangeProfileStep && (
          <IconButton
            className={styles['profile-modal__back-button']}
            onClick={handleBack}
          >
            <ArrowBackIosIcon fontSize='medium' />
          </IconButton>
        )}
        <IconButton
          className={styles['profile-modal__close-button']}
          onClick={handleClose}
        >
          <CloseIcon fontSize='medium' />
        </IconButton>
        <Box className={styles['profile-modal__main']}>
          <Typography variant='h4' className={styles['profile-modal__heading']}>
            {isChangeProfileStep ? 'Update Profile' : 'Profile Details'}
          </Typography>
          {!isChangeProfileStep ? (
            <Box className={styles['profile-modal__info']}>
              <UpdateProfilePhoto
                profilePic={user?.photoURL}
                isChangeProfileStep={isChangeProfileStep}
                setIsChangeProfileStep={setIsChangeProfileStep}
                setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
                setImage={setImage}
                onRemoveProfileClick={onRemoveProfileClick}
                isRemoveButtonLoading={isRemoveButtonLoading}
              />
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
          ) : (
            <ImageCropper
              crop={crop}
              setCrop={setCrop}
              imageRef={imageRef}
              src={blobImageURL}
              setCompletedCrop={setCompletedCrop}
            />
          )}
        </Box>
        <Box className={styles['profile-modal__actions']}>
          <Button
            disabled={isSubmitButtonDisabled || isImageUploading}
            variant='contained'
            className={styles['profile-modal__submit-button']}
            onClick={onSubmitButtonClick}
          >
            {isImageUploading ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              'Submit'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
