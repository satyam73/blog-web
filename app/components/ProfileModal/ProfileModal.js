import React, { useEffect, useRef, useState } from 'react'
import { updateProfile } from 'firebase/auth';

import { getDataById, updateDataOfFirebase } from '@/app/firebase/db/db';
import { useToast } from '@/app/contexts/ToastProvider';
import { useUser } from '@/app/contexts/UserProvider';
import { useDebounceEffect } from './profileModal.hooks';

import { fileToBlob } from '@/utilities/common';
import { imgPreview } from './profileModal.util';

import { ERROR_MESSAGES, INFO_MESSAGES, SUCCESS_MESSAGES, TOAST_TYPES } from '@/constants';

import ProfileModalPresentation from './ProfileModalPresentation'

export default function ProfileModal({ open, handleClose }) {
  console.log('open ', open)
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isRemoveButtonLoading, setIsRemoveButtonLoading] = useState(false);
  const { user, userDataFirebase, loading } = useUser();
  const [isChangeProfileStep, setIsChangeProfileStep] = useState();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const blobImageURL = fileToBlob(image);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const { toast, showToast } = useToast();
  const [formFields, setFormFields] = useState({
    name: userDataFirebase?.name,
    bio: userDataFirebase?.bio
  });

  useEffect(() => {
    setFormFields({
      name: userDataFirebase?.name,
      email: userDataFirebase?.email,
      bio: userDataFirebase?.bio
    })
  }, [loading])
  useDebounceEffect(() => {
    imgPreview(imageRef, completedCrop).then(({ file, blob }) => {

      setCroppedImageBlob(blob);
    });

  }, 800, [completedCrop, imageRef]);


  function handleBack() {
    setIsChangeProfileStep(false);
    setCompletedCrop(null);
    setCrop(null);
    setCroppedImageBlob(null);
    setImage(null);
    setIsSubmitButtonDisabled(true);
  }

  async function uploadImageToCloud(imageFile) {
    try {
      const type = imageFile.type;

      if (type === "image/png" || type === "image/jpeg") {
        const imageFormData = new FormData();

        imageFormData.append("file", image);
        imageFormData.append("upload_preset", "blog-web-app");
        imageFormData.append("cloud_name", "dl5pqfdrf");
        imageFormData.append("asset_folder", "blog-web-app");
        imageFormData.append("folder", "blog-web-app");

        imageFormData.append("tags", [
          "blog-web-app",
          "userPic",
          "profile",
          "profilePic",
        ]);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dl5pqfdrf/image/upload",
          {
            method: "post",
            body: imageFormData,
          }
        );
        const data = await response.json();
        const { status } = response;
        const { url } = data;

        if (status === 200) return url;
        throw new Error();
      }
    } catch (error) {
      console.error('Some error occured while updating profile picture ', error)
    }
  }

  async function onSubmitButtonClick() {
    if (isChangeProfileStep) {
      setIsSubmitButtonLoading(true);

      let sanitizedFile;

      if (croppedImageBlob && croppedImageBlob.type) {
        sanitizedFile = new File([croppedImageBlob], image.name, { type: croppedImageBlob.type })
      } else {
        sanitizedFile = image;
      }

      try {
        const cloudImageURL = await uploadImageToCloud(sanitizedFile);

        updateProfile(user, { photoURL: cloudImageURL });
        await updateDataOfFirebase(user.uid, 'users', { profilePic: cloudImageURL });
        showToast({ ...toast, isVisible: true, text: SUCCESS_MESSAGES.PROFILE_UPDATE_MESSAGE, type: TOAST_TYPES.SUCCESS });
      } catch (error) {
        console.error('some error ocurred while updating profile picture ', error);
        showToast({ ...toast, isVisible: true, text: ERROR_MESSAGES.SOMETHING_WENT_WRONG, type: TOAST_TYPES.ERROR });
      } finally {
        setIsSubmitButtonLoading(false);
        handleBack();
      }
      return;
    }

    //email updation to be handle later
    const sanitizedData = {
      bio: formFields.bio.trim(),
      name: formFields.name.trim()
    }
    setIsSubmitButtonLoading(true);
    try {
      const { result, error } = await updateDataOfFirebase(user.uid, 'users', sanitizedData);

      if (result && !error) return showToast({ ...toast, isVisible: true, text: SUCCESS_MESSAGES.PROFILE_UPDATE_MESSAGE, type: TOAST_TYPES.SUCCESS });

      throw new Error();
    } catch (error) {
      console.error('Some error occured while updating profile details ', error);
      showToast({ ...toast, isVisible: true, text: ERROR_MESSAGES.SOMETHING_WENT_WRONG, type: TOAST_TYPES.ERROR });
    } finally {
      setIsSubmitButtonLoading(false);
    }
  }

  async function onRemoveProfileClick() {
    if (!user.photoURL) return showToast({ ...toast, isVisible: true, text: INFO_MESSAGES.PROFILE_ALREADY_REMOVED, type: TOAST_TYPES.INFO });

    setIsRemoveButtonLoading(true)
    try {
      updateProfile(user, { photoURL: '' });
      await updateDataOfFirebase(user.uid, 'users', { profilePic: null });
      showToast({ ...toast, isVisible: true, text: SUCCESS_MESSAGES.PROFILE_UPDATE_MESSAGE, type: TOAST_TYPES.SUCCESS });
    } catch (error) {
      console.error('Something went wrong while removing profile picture ', error);
      showToast({ ...toast, isVisible: true, text: ERROR_MESSAGES.SOMETHING_WENT_WRONG, type: TOAST_TYPES.ERROR });
    } finally {
      setIsRemoveButtonLoading(false);
    }
  }

  function handleInputChange(e) {
    const sanitizedValue = e.target.value;
    const name = e.target.name;
    setIsSubmitButtonDisabled(false);

    setFormFields({ ...formFields, [name]: sanitizedValue });
  }

  return (
    <ProfileModalPresentation
      open={open}
      handleClose={handleClose}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      user={user}
      setIsChangeProfileStep={setIsChangeProfileStep}
      isChangeProfileStep={isChangeProfileStep}
      setIsSubmitButtonDisabled={setIsSubmitButtonDisabled}
      setImage={setImage}
      image={image} blobImageURL={blobImageURL}
      onSubmitButtonClick={onSubmitButtonClick}
      imageRef={imageRef} crop={crop} setCrop={setCrop}
      setCompletedCrop={setCompletedCrop}
      handleBack={handleBack}
      isSubmitButtonLoading={isSubmitButtonLoading}
      onRemoveProfileClick={onRemoveProfileClick}
      isRemoveButtonLoading={isRemoveButtonLoading}
      handleInputChange={handleInputChange}
      formFields={formFields}
    />
  )
};