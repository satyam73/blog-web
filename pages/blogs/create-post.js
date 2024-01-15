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

import { addDataToFirebase, updateDataOfFirebase } from '@/app/firebase/db/db';
import styles from '@/styles/create-post.module.css';
import UploadImage from '@/app/components/UploadImage/UploadImage';
const NextImage = dynamic(
  () => import('next/image'),
  {
    ssr: false,
  }
);


export default function CreatePost() {
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
  });
  const [file, setFile] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isUploadImageVisible, setIsUploadImageVisible] = useState(false);
  const [isPublishButtonDisabled, setIsPublishButtonDisabled] = useState(true);

  useEffect(() => {
    // const blogData = {
    //   title: 'blog title',
    //   content: 'blog content11',
    //   featuredImage: 'blob file',
    //   readCount: 1212,
    //   status: 'published | draft',
    //   createdBy: '121213123',
    //   createdAt: '32324535',
    //   updatedAt: '32324424',
    //   likes: 42,
    //   categories: ['tech']
    // };
    (async () => {
      const { error, result } = await addDataToFirebase('blogs', blogData);
      console.log(error, result);
    })();
    updateDataOfFirebase('ZPMzOnRiuYNDXZlBzpWf', 'blogs', {
      title: 'phir se update ho gaya mai'
    })
  }, []);

  function handleBlogPostChange(value, name = 'content') {
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
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
  }


  return (
    <Box className={styles['create-post']}>
      <Typography variant='h4' className={styles['create-post__heading']}>
        Create Post
      </Typography>
      <Box className={styles['create-post__editor']}>
        {imageURL ?
          <Box className={styles['create-post__image-container']} onMouseOver={() => setIsUploadImageVisible(true)} onMouseOut={() => setIsUploadImageVisible(false)}   >
            {isUploadImageVisible && <UploadImage isUploadImageVisible={isUploadImageVisible} style={{ background: 'rgba(0, 0, 0, 0.03)', width: 'calc(100vw - 100px)', height: '250px', position: 'absolute' }} file={file} onImageUpload={onImageUpload} />}
            <NextImage width={100} height={250} className={styles['create-post__featured-image']} src={imageURL} alt='featured banner' />
          </Box>
          : <UploadImage file={file} onImageUpload={onImageUpload} />}
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
