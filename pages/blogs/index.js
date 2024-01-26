import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getAllDocs } from '@/app/firebase/db/db';
import UserProvider, { useUser } from '@/app/contexts/UserProvider';

import Layout from '@/app/components/common/Layout/Layout';
import ProfileCard from '@/app/components/ProfileCard/ProfileCard';
import BlogCard from '@/app/components/blogs/BlogCard/BlogCard';

import BlogCardSkeleton from '@/app/components/blogs/BlogCard/BlogCardSkeleton';

import styles from '@/styles/blogs.module.css';
export default function BlogsPage() {
  const { userDataFirebase, loading: isUserInfoLoading } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { result, error } = await getAllDocs('blogs');

        if (result && !error) {
          setBlogs(result);
        }
      } catch (error) {
        console.error('Some error occured in fetch blogs function ', error);
      } finally {
        setIsBlogsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const blogsSkeletonMapping = Array(5)
    .fill('blogsSkeletonMapping')
    .map((skeleton, index) => (
      <BlogCardSkeleton key={skeleton + '-' + index} />
    ));

  return (
    <Box className={styles.blogs}>
      <Typography variant='h1' className={styles['blogs__heading']}>
        Explore Blogs
      </Typography>
      <Box className={styles['blogs__main']}>
        <Box className={styles['main__container']}>
          {isBlogsLoading
            ? blogsSkeletonMapping
            : blogs?.map((blog) => {
              return (
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  image={blog.featuredImage || '/assets/profile.jpg'}
                  key={blog.id}
                />
              );
            })}
        </Box>
        <Box className={styles['main__sidebar']}>
          <ProfileCard
            name={userDataFirebase?.name}
            image={userDataFirebase?.profilePic}
            bio={userDataFirebase?.bio}
            isButtonVisible={true}
            isLoading={isUserInfoLoading}
          />
        </Box>
      </Box>
    </Box>
  );
}

BlogsPage.getLayout = function getLayout(page) {
  return (
    <UserProvider>
      <Layout> {page}</Layout>
    </UserProvider>
  );
};
