import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../common/Modal/Modal';
import InputBox from '../common/Input/InputBox';
import UpdateProfilePhoto from './UpdateProfilePhoto';
import styles from './profileModal.module.css';

export default function ProfileModalPresentation({ open, handleClose }) {
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
            <UpdateProfilePhoto />
            <InputBox
              value={'Satyam Bajpai'}
              type={'text'}
              name={'Name'}
              placeholder={'name'}
              id={'name'}
              isValid={'true'}
              disabled={true}
              handleChange
            />
            <InputBox
              value={'bajpai1973satyam@gmail.com'}
              type={'text'}
              name={'Email'}
              placeholder={'name'}
              id={'name'}
              isValid={'true'}
              disabled={true}
              handleChange
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
              value={`Real Dev Squad is an online non-profit open source free fun community for people in tech, mainly developers, designers, college students, or product managers, to come, learn and contribute towards building a platform for our community, that helps upskill everyone.
              We are an inclusive, respectful, warm, motivated and commited squad of people who constantly grow together and tackle bigger and harder challenges to ensure we become some of the best problem solvers, engineers, designers and more out there.`}
            ></textarea>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
