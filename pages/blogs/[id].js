import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import ReactHtmlParser from 'react-html-parser';

import { getAllDocs, getDataById } from '@/app/firebase/db/db';
import styles from '@/styles/blog-post.module.css';
import ToastProvider from '@/app/contexts/ToastProvider';
import UserProvider from '@/app/contexts/UserProvider';
import Layout from '@/app/components/common/Layout/Layout';
import ProfileCard from '@/app/components/ProfileCard/ProfileCard';

export default function BlogPost({ post, author }) {
  console.log(author)
  const sanitizedPost = DOMPurify.sanitize(post?.content, {
    USE_PROFILES: { html: true },
  });

  return (
    <Box className={styles['blog-post']}>
      <Typography className={styles['blog-post__heading']} variant='h1'>
        {post.title}
      </Typography>
      <Box className={styles['blog-post__image-container']}>
        <Image
          className={styles['blog-post__image']}
          src={post.featuredImage}
          fill={true}
        />
      </Box>
      <Box className={styles['blog-post__content']}>
        {ReactHtmlParser(sanitizedPost)}
      </Box>
      <ProfileCard name={author.name} image={author.profilePic} bio={author.bio} />
    </Box>
  );
}

BlogPost.getLayout = function getLayout(page) {
  return (
    <ToastProvider>
      <UserProvider>
        <Layout>{page}</Layout>
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
  const { result: author, } = await getDataById(post.createdBy, 'users');

  // Pass post data to the page via props
  return { props: { post, author } };
}
