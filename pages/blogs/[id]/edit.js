import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import {
  getAllDocs,
  getDataById,
  updateDataOfFirebase,
} from '@/app/firebase/db/db';

import { uploadImageToCloud } from '@/services/cloudinary';

import UserProvider from '@/app/contexts/UserProvider';
import ToastProvider, { useToast } from '@/app/contexts/ToastProvider';

import { INFO_MESSAGES, SUCCESS_MESSAGES, TOAST_TYPES } from '@/constants';

import UploadImage from '@/app/components/UploadImage/UploadImage';
import AuthGuard from '@/app/components/AuthGuard/AuthGuard';
import EditGuard from '@/app/components/EditGuard/EditGuard';
import Layout from '@/app/components/common/Layout/Layout';
const RichTextEditor = dynamic(
  () => import('@/app/components/RichTextEditor/RichTextEditor'),
  {
    ssr: false,
  }
);

import styles from '@/styles/edit-post.module.css';

export default function EditPost({ post }) {
  const router = useRouter();
  const [quill, setQuill] = useState(null);
  const [blogPost, setBlogPost] = useState({
    title: post?.title || '',
    content: post?.content || '',
  });
  const { toast, showToast } = useToast();
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isEditButtonLoading, setIsEditButtonLoading] = useState(false);
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(false);

  const [isUploadImageVisible, setIsUploadImageVisible] = useState(true);

  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(post?.featuredImage);

  useEffect(() => {
    setIsPostLoading(false);
  }, []);

  useEffect(() => {
    if (!quill) return;
    //TODO work on santizing DOM when creating, updating
    quill.clipboard.dangerouslyPasteHTML(0, post?.content);
  }, [quill]);

  function handleBlogPostChange(value, name, editorInstance) {
    setBlogPost((prevBlogPost) => ({ ...prevBlogPost, [name]: value }));
  }
  function onImageUpload(e) {
    setFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
  }

  function getSanitizedData() {
    const sanitizedObject = {};

    const isTitleChanged = blogPost.title.trim() !== post.title;
    const isContentChanged = blogPost.content.trim() !== post.content;

    if (isTitleChanged) {
      sanitizedObject.title = blogPost.title.trim();
    }

    if (isContentChanged) {
      sanitizedObject.content = blogPost.content.trim();
    }

    return sanitizedObject;
  }

  async function handleBlogPostSubmit() {
    const isImageChanged = imageURL !== post.featuredImage;
    if (!imageURL || !blogPost.title.trim() || !blogPost.content.trim())
      return showToast({
        ...toast,
        isVisible: true,
        text: INFO_MESSAGES.BLOG_POST_VALIDATION_MESSAGE,
        type: TOAST_TYPES.INFO,
      });
    setIsEditButtonLoading(true);
    setIsEditButtonDisabled(true);
    try {
      let uploadedImageURL;
      const dataToUpdate = getSanitizedData();
      if (isImageChanged) {
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          uploadedImageURL = await uploadImageToCloud(
            file,
            'blog-web-app/posts'
          );
          dataToUpdate.featuredImage = uploadedImageURL;
        } else {
          return showToast({
            ...toast,
            isVisible: true,
            text: INFO_MESSAGES.PNG_JPEG_IMAGE_VALIDATION,
            type: TOAST_TYPES.INFO,
          });
        }
      }

      const { error } = updateDataOfFirebase(post?.id, 'blogs', dataToUpdate);

      if (error) throw error;

      return showToast({
        ...toast,
        isVisible: true,
        text: SUCCESS_MESSAGES.BLOG_POST_UPDATED,
        type: TOAST_TYPES.SUCCESS,
      });
    } catch (error) {
      console.error('Something went wrong while editing the post ', error);
    } finally {
      setIsEditButtonLoading(false);
      setIsEditButtonDisabled(false);
    }
  }

  //TODO add loading skeleton
  if (isPostLoading) return <>loading</>;

  return (
    <Box className={styles['edit-post']}>
      <Typography variant='h1' className={styles['edit-post__heading']}>
        Edit Post
      </Typography>
      <Box className={styles['edit-post__editor']}>
        {imageURL ? (
          <Box
            className={styles['edit-post__image-container']}
            onMouseOver={() => setIsUploadImageVisible(true)}
            onMouseOut={() => setIsUploadImageVisible(false)}
          >
            {isUploadImageVisible && (
              <UploadImage
                isUploadImageVisible={isUploadImageVisible}
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  width: 'calc(100vw - 100px)',
                  height: '250px',
                  position: 'absolute',
                }}
                file={file}
                onImageUpload={onImageUpload}
              />
            )}
            <Image
              width={100}
              height={250}
              className={styles['edit-post__featured-image']}
              src={imageURL}
              alt='featured banner'
            />
          </Box>
        ) : (
          <UploadImage file={file} onImageUpload={onImageUpload} />
        )}
        <input
          onInput={(e) => handleBlogPostChange(e.target.value, e.target.name)}
          className={styles['editor__title']}
          type='text'
          placeholder='Title here!'
          name='title'
          value={blogPost?.title}
        />
        <RichTextEditor
          handleBlogPostChange={handleBlogPostChange}
          setQuill={setQuill}
        />
      </Box>
      <Box className={styles['edit-post__buttons']}>
        <Button
          onClick={handleBlogPostSubmit}
          variant='contained'
          className={styles['buttons__edit']}
          disabled={isEditButtonDisabled}
        >
          {isEditButtonLoading ? (
            <CircularProgress size={20} color='inherit' />
          ) : (
            'Edit'
          )}
        </Button>
        <Button
          onClick={() => router.push('/dashboard')}
          variant='outlined'
          className={styles['buttons__back']}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

EditPost.getLayout = function getLayout(page) {
  return (
    <ToastProvider>
      <UserProvider>
        <AuthGuard>
          <EditGuard>
            <Layout>{page}</Layout>
          </EditGuard>
        </AuthGuard>
      </UserProvider>
    </ToastProvider>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { result, error } = await getAllDocs('blogs');

  // Get the paths we want to pre-render based on posts
  const paths = result.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { result: post, error } = await getDataById(params.id, 'blogs');

  // Pass post data to the page via props
  return { props: { post } };
}
