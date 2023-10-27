import { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/common/Layout/Layout';
import { Box, Button, Typography } from '@mui/material';

const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor/RichTextEditor'),
  {
    ssr: false,
  }
);

import styles from '@/styles/create-post.module.css';

export default function CreatePost() {
  const [blogPost, setBlogPost] = useState('');

  const handleBlogPostChange = (value) => {
    setBlogPost(value);
  };

  return (
    <Box className={styles['create-post']}>
      <Typography variant='h4' className={styles['create-post__heading']}>
        Create Post
      </Typography>
      <Box className={styles['create-post__editor']}>
        <RichTextEditor model={blogPost} handleBlogPostChange={handleBlogPostChange} />
      </Box>
      <Box className={styles['create-post__buttons']}>
        <Button variant='contained' className='buttons__publish'>
          Publish
        </Button>
        <Button variant='outlined' className={styles['buttons__discard']}>
          Discard
        </Button>
      </Box>
    </Box>
  );
}

CreatePost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
