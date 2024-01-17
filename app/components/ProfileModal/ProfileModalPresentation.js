import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../common/Modal/Modal';
import InputBox from '../common/Input/InputBox';
import UpdateProfilePhoto from './UpdateProfilePhoto';
import styles from './profileModal.module.css';
import ImageCropper from './ImageCropper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
