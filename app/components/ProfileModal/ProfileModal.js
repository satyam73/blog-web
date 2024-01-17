import React, { useEffect, useRef, useState } from 'react'
import ProfileModalPresentation from './ProfileModalPresentation'
import { useUser } from '@/app/contexts/UserProvider';
import { fileToBlob } from '@/utilities/common';
import { canvasPreview, downloadFile, imgPreview } from './profileModal.util';
import { useDebounceEffect } from './profileModal.hooks';
import { updateProfile } from 'firebase/auth';
import { useToast } from '@/app/contexts/ToastProvider';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_TYPES } from '@/constants';
import { updateDataOfFirebase } from '@/app/firebase/db/db';

export default function ProfileModal({ open, handleClose }) {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const { user } = useUser();
  const [isChangeProfileStep, setIsChangeProfileStep] = useState();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const blobImageURL = fileToBlob(image);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { toast, showToast } = useToast();

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
      setIsImageUploading(true);

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
        showToast({ ...toast, isVisible: true, text: SUCCESS_MESSAGES.PROFILE_PIC_UPDATE_MESSAGE, type: TOAST_TYPES.SUCCESS });
      } catch (error) {
        console.error('some error ocurred while updating profile picture ', error);
        showToast({ ...toast, isVisible: true, text: ERROR_MESSAGES.SOMETHING_WENT_WRONG, type: TOAST_TYPES.ERROR });
      } finally {
        setIsImageUploading(false);
        handleBack();
      }
      return;
    }
  }

  return (
    <ProfileModalPresentation open={open} handleClose={handleClose} isSubmitButtonDisabled={isSubmitButtonDisabled} user={user} setIsChangeProfileStep={setIsChangeProfileStep} isChangeProfileStep={isChangeProfileStep} setIsSubmitButtonDisabled={setIsSubmitButtonDisabled} setImage={setImage} image={image} blobImageURL={blobImageURL} onSubmitButtonClick={onSubmitButtonClick} imageRef={imageRef} crop={crop} setCrop={setCrop} setCompletedCrop={setCompletedCrop} handleBack={handleBack} isImageUploading={isImageUploading} />
  )
};