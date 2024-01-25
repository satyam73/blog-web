import AuthGuard from '@/app/components/AuthGuard/AuthGuard';
import EditGuard from '@/app/components/EditGuard/EditGuard';
import Layout from '@/app/components/common/Layout/Layout';
import ToastProvider from '@/app/contexts/ToastProvider';
import UserProvider from '@/app/contexts/UserProvider';
import { getAllDocs, getDataById } from '@/app/firebase/db/db';
import { Box, Button, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const RichTextEditor = dynamic(
  () => import('@/app/components/RichTextEditor/RichTextEditor'),
  {
    ssr: false,
  }
);
import styles from '@/styles/edit-post.module.css';
import UploadImage from '@/app/components/UploadImage/UploadImage';
import Image from 'next/image';
export default function EditPost({ post }) {
  const router = useRouter();
  const { id: postId } = router.query;
  const [quill, setQuill] = useState(null);
  const [blogPost, setBlogPost] = useState({
    title: post?.title || '',
    content: post?.content || '',
  });
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [postData, setPostData] = useState(post);
  const [isUploadImageVisible, setIsUploadImageVisible] = useState(true);
  const [postImage, setPostImage] = useState(post?.featuredImage);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!quill) return;

    quill.clipboard.dangerouslyPasteHTML(0, postData?.content);
  }, [quill, postData]);

  function handleBlogPostChange(value, name, editorInstance) {
    console.log(value, name, editorInstance);
    setBlogPost((prevBlogPost) => ({ ...prevBlogPost, [name]: value }));
  }

  function onImageUpload() {
    console.log('onImageUpload');
  }

  function handleBlogPostSubmit() {}

  function onDiscardClick() {}
  //TODO add loading skeleton
  if (isPostLoading) return <>loading</>;
  return (
    <Box className={styles['edit-post']}>
      <Typography variant='h1' className={styles['edit-post__heading']}>
        Edit Post
      </Typography>
      <Box className={styles['edit-post__editor']}>
        {postImage ? (
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
              src={postImage}
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
          className='buttons__publish'
          // disabled={isPublishButtonDisabled}
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
