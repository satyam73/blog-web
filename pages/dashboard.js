import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { getAllDocs } from '@/app/firebase/db/db';
import ToastProvider from '@/app/contexts/ToastProvider';
import UserProvider, { useUser } from '@/app/contexts/UserProvider';

import Layout from '@/app/components/common/Layout/Layout';
import AuthGuard from '@/app/components/AuthGuard/AuthGuard';
import BlogCard from '@/app/components/blogs/BlogCard/BlogCard';

import styles from '@/styles/dashboard.module.css';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { userDataFirebase, loading } = useUser();

  useEffect(() => {
    const queryOptions = {
      createdBy: userDataFirebase?.id,
    };
    (async () => {
      try {
        const { result, error } = await getAllDocs('blogs', queryOptions);
        if (result && !error) {
          setPosts(result);
        } else {
          throw error;
        }
      } catch (error) {
        console.error('Something went wrong while fetching the posts ', error);
      }
    })();
  }, [loading, userDataFirebase]);

  return (
    <Box className={styles['dashboard']}>
      <Typography className={styles['dashboard__heading']} variant='h1'>
        Your posts
      </Typography>
      <Box className={styles['dashboard__buttons']}>
        <Link
          href='/blogs/create-post'
          className={styles['dashboard__add-post-button']}
        >
          <AddIcon />
          Add post
        </Link>
      </Box>
      {posts?.map((post) => (
        <BlogCard
          key={post.id}
          id={post.id}
          title={post.title}
          image={post.featuredImage}
          isEditMode={true}
        />
      ))}
    </Box>
  );
}

Dashboard.getLayout = function getLayout(page) {
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
