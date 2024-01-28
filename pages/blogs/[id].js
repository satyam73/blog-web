import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import ReactHtmlParser from 'react-html-parser';
import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { getAllDocs, getDataById } from '@/app/firebase/db/db';
import ToastProvider from '@/app/contexts/ToastProvider';
import UserProvider from '@/app/contexts/UserProvider';

import Layout from '@/app/components/common/Layout/Layout';
import ProfileCard from '@/app/components/ProfileCard/ProfileCard';

import styles from '@/styles/blog-post.module.css';
import 'highlight.js'
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/default.min.css';
import 'highlight.js/styles/a11y-dark.min.css';
import { COMMON_PROGRAMMING_LANGUAGES } from '@/constants';

export default function BlogPost({ post, author }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      hljs.highlightAll()
      document.querySelectorAll('.ql-syntax').forEach((element) => {
        element.innerHTML = hljs.highlightAuto(element.innerHTML, COMMON_PROGRAMMING_LANGUAGES).value
      });
    }
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const sanitizedPost = DOMPurify.sanitize(post?.content, {
    USE_PROFILES: { html: true },
  });

  return (
    <Box className={styles['blog-post']}>
      <Typography className={styles['blog-post__heading']} variant='h1'>
        {isLoading ? <Skeleton height={60} sx={{ width: '100%' }} /> : post.title}
      </Typography>
      <Box className={styles['blog-post__image-container']}>
        {isLoading ? <Skeleton height={300} sx={{ width: '100%' }} /> :
          <Image
            className={styles['blog-post__image']}
            src={post.featuredImage}
            fill={true}
          />}
      </Box>
      <Box className={styles['blog-post__content']}>
        {isLoading ?
          <>
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
            <Skeleton height={30} sx={{ width: '100%' }} />
          </> :
          ReactHtmlParser(sanitizedPost)
        }
      </Box>
      {isLoading ? <Skeleton height={300} sx={{ width: '100%' }} /> : < ProfileCard name={author.name} image={author.profilePic} bio={author.bio} />}
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
