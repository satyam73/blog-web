import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Skeleton, Typography } from '@mui/material';
const NextImage = dynamic(() => import('next/image'), {
  ssr: false,
});

import { addDataToFirebase } from '@/app/firebase/db/db';
import { uploadImageToCloud } from '@/services/cloudinary';
import UserProvider, { useUser } from '@/app/contexts/UserProvider';
import ToastProvider, { useToast } from '@/app/contexts/ToastProvider';

import {
  ERROR_MESSAGES,
  INFO_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_TYPES,
} from '@/constants';

import AuthGuard from '@/app/components/AuthGuard/AuthGuard';
import UploadImage from '@/app/components/UploadImage/UploadImage';
import Layout from '@/app/components/common/Layout/Layout';
const RichTextEditor = dynamic(
  () => import('@/app/components/RichTextEditor/RichTextEditor'),
  {
    ssr: false,
    loading: () => (
      <Skeleton sx={{ width: '100%', height: '500px' }} variant='rounded' />
    ),
  }
);

import styles from '@/styles/create-post.module.css';

export default function CreatePost() {
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
  });
  const [file, setFile] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isUploadImageVisible, setIsUploadImageVisible] = useState(false);
  const [isPublishButtonDisabled, setIsPublishButtonDisabled] = useState(true);
  const { toast, showToast } = useToast();
  const { user } = useUser();
  const [editor, setEditor] = useState(null);

  function handleBlogPostChange(value, name, editorInstance = null) {
    if (editorInstance) {
      setEditor(editorInstance);
    }

    setBlogPost((prevBlogPost) => ({ ...prevBlogPost, [name]: value }));
    const tempIsPublishButtonDisabled = value.trim().length <= 0;
    setIsPublishButtonDisabled(tempIsPublishButtonDisabled);
  }

  async function handleBlogPostSubmit() {
    if (!file || !blogPost.title.trim() || !blogPost.content.trim())
      return showToast({
        ...toast,
        isVisible: true,
        text: INFO_MESSAGES.BLOG_POST_VALIDATION_MESSAGE,
        type: TOAST_TYPES.INFO,
      });

    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      try {
        const url = await uploadImageToCloud(file, 'blog-web-app/posts');
        const blogData = {
          title: blogPost.title.trim(),
          content: blogPost.content.trim(),
          featuredImage: url,
          status: 'published',
          createdBy: user.uid,
        };
        const { result, error } = await addDataToFirebase('blogs', blogData);

        if (result && !error) {
          showToast({
            ...toast,
            isVisible: true,
            text: SUCCESS_MESSAGES.BLOG_POST_PUBLISHED,
            type: TOAST_TYPES.SUCCESS,
          });
          setBlogPost({
            title: '',
            content: '',
          });
          if (editor) {
            editor.root.innerHTML = '';
          }
          setImageURL('');
          setFile(null);

          return;
        }

        throw new Error();
      } catch (error) {
        console.error('Some error occured while publishing blog post ', error);
        showToast({
          ...toast,
          isVisible: true,
          text: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          type: TOAST_TYPES.ERROR,
        });
      }
    }
  }

  function onImageUpload(e) {
    setFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
  }

  function onDiscardClick() {
    const isOk = confirm(
      'Are you sure? All the contents of the post will be lost'
    );

    if (!isOk) return;

    setBlogPost({
      title: '',
      content: '',
    });

    if (editor) {
      editor.root.innerHTML = '';
    }

    setImageURL('');
    setFile(null);
  }

  return (
    <Box className={styles['create-post']}>
      <Typography variant='h1' className={styles['create-post__heading']}>
        Create Post
      </Typography>
      <Box className={styles['create-post__editor']}>
        {imageURL ? (
          <Box
            className={styles['create-post__image-container']}
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
            <NextImage
              width={100}
              height={250}
              className={styles['create-post__featured-image']}
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
          value={blogPost.title}
        />
        <RichTextEditor handleBlogPostChange={handleBlogPostChange} />
      </Box>
      <Box className={styles['create-post__buttons']}>
        <Button
          onClick={handleBlogPostSubmit}
          variant='contained'
          className='buttons__publish'
          disabled={isPublishButtonDisabled}
        >
          Publish
        </Button>
        <Button
          onClick={onDiscardClick}
          variant='outlined'
          className={styles['buttons__discard']}
        >
          Discard
        </Button>
      </Box>
    </Box>
  );
}

CreatePost.getLayout = function getLayout(page) {
  return (
    <ToastProvider>
      <UserProvider>
        <AuthGuard>
          <Layout>{page}</Layout>
        </AuthGuard>
      </UserProvider>
    </ToastProvider>
  );
};
