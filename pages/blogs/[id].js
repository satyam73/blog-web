import Image from 'next/image';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import ReactHtmlParser from 'react-html-parser';
import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { getAllDocs, getDataById } from '@/app/firebase/db/db';
import ToastProvider from '@/app/contexts/ToastProvider';
import UserProvider from '@/app/contexts/UserProvider';

import { COMMON_PROGRAMMING_LANGUAGES } from '@/constants';

import Layout from '@/app/components/common/Layout/Layout';
import ProfileCard from '@/app/components/ProfileCard/ProfileCard';

import styles from '@/styles/blog-post.module.css';
import 'highlight.js'
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/default.min.css';
import 'highlight.js/styles/a11y-dark.min.css';

export default function BlogPost() {
  const router = useRouter();
  const { id: postId } = router.query;
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
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
    async function getPostData() {
      setIsLoading(true);
      try {
        if (!postId) return;

        const { result: postData, error: isPostDataError } = await getDataById(postId, 'blogs');

        if (isPostDataError || !postData) throw new Error('Unable to fetch post data');

        const { result: authorData, error: isAuthorDataError } = await getDataById(postData?.createdBy, 'users');

        if (!isPostDataError && !isAuthorDataError && postData && authorData) {
          setPost(postData);
          setAuthor(authorData)
        }
      } catch (error) {
        console.error('Some went wrong while getting post: ', error)
      } finally {
        setIsLoading(false);
      }
    }

    getPostData();
  }, [postId]);

  const sanitizedPost = DOMPurify.sanitize(post?.content, {
    USE_PROFILES: { html: true },
  });

  return (
    <Box className={styles['blog-post']}>
      <Typography className={styles['blog-post__heading']} variant='h1'>
        {isLoading ? <Skeleton height={60} sx={{ width: '100%' }} /> : post?.title}
      </Typography>
      <Box className={styles['blog-post__image-container']}>
        {isLoading ? <Skeleton height={300} sx={{ width: '100%' }} /> :
          <Image
            className={styles['blog-post__image']}
            src={post?.featuredImage}
            fill={true}
            alt={post?.title}
          />}
      </Box>
      <Box className={styles['blog-post__content']}>
        {isLoading ?
          <>
            {Array(10).fill('blog-post-content-skeleton').map((skeleton, index) => (
              <Skeleton key={`${skeleton}-${index}`} height={30} sx={{ width: '100%' }} />
            ))}
          </> :
          ReactHtmlParser(sanitizedPost)
        }
      </Box>
      {isLoading ? <Skeleton height={300} sx={{ width: '100%' }} /> : <ProfileCard name={author?.name} image={author?.profilePic} bio={author?.bio} />}
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