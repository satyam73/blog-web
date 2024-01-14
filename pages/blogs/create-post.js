import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Layout from '@/app/components/common/Layout/Layout';
import { Box, Button, IconButton, Typography } from '@mui/material';
const RichTextEditor = dynamic(
  () => import('@/app/components/RichTextEditor/RichTextEditor'),
  {
    ssr: false,
  }
);

import { addDataToFirebase } from '@/app/firebase/db/db';
import styles from '@/styles/create-post.module.css';
import UploadImage from '@/app/components/UploadImage/UploadImage';

export default function CreatePost() {
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
  });
  const [file, setFile] = useState('');
  const [isPublishButtonDisabled, setIsPublishButtonDisabled] = useState(true);

  // useEffect(() => {
  //   const blogData = {
  //     title: 'blog title',
  //     content: 'blog content11',
  //   };
  //   (async () => {
  //     const { error, result } = await addDataToFirebase('blogs', blogData);
  //     console.log(error, result);
  //   })();
  // }, []);

  function handleBlogPostChange(value, name = 'content') {
    console.log(value, name)
    setBlogPost((prevBlogPost) => ({ ...prevBlogPost, [name]: value }))
    const tempIsPublishButtonDisabled = value.trim().length <= 0;
    setIsPublishButtonDisabled(tempIsPublishButtonDisabled);
  };

  function handleBlogPostSubmit() {
    setBlogPost({
      title: '',
      content: '',
    });
  }

  function onImageUpload(e) {
    setFile(e.target.files[0])
  }

  return (
    <Box className={styles['create-post']}>
      <Typography variant='h4' className={styles['create-post__heading']}>
        Create Post
      </Typography>
      <Box className={styles['create-post__editor']}>
        <UploadImage file={file} onImageUpload={onImageUpload} />
        <input onInput={(e) => handleBlogPostChange(e.target.value, e.target.name)} className={styles['editor__title']} type='text' placeholder='Title here!' name='title' />
        <RichTextEditor model={blogPost} handleBlogPostChange={handleBlogPostChange} />
      </Box>
      <Box className={styles['create-post__buttons']}>
        <Button onClick={handleBlogPostSubmit} variant='contained' className='buttons__publish' disabled={isPublishButtonDisabled}>
          Publish
        </Button>
        <Button variant='outlined' className={styles['buttons__discard']} >
          Discard
        </Button>
      </Box>
    </Box>
  );
}

CreatePost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
