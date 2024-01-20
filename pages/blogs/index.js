import { Box, Typography, useStepContext } from '@mui/material';
import Layout from '@/app/components/common/Layout/Layout';
import styles from '@/styles/blogs.module.css';
import BlogCard from '@/app/components/blogs/BlogCard/BlogCard';
import ProfileCard from '@/app/components/ProfileCard/ProfileCard';
import UserProvider, { useUser } from '@/app/contexts/UserProvider';
import { getAllDocs } from '@/app/firebase/db/db';
import { useEffect, useState } from 'react';

export default function BlogsPage() {
  const { user, userDataFirebase, loading } = useUser();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { result, error } = await getAllDocs('blogs');

        console.log(result)
        if (result && !error) {
          setBlogs(result)
        }
      } catch (error) {
        console.error('Some error occured in fetch blogs function ', error);
      }
    }
    fetchBlogs();
  }, [loading]);

  if (loading) return;
  return (
    <Box className={styles.blogs}>
      <Typography component='h2' className={styles['blogs__heading']}>
        Explore Blogs
      </Typography>
      <Box className={styles['blogs__main']}>
        <Box className={styles['main__container']}>
          {blogs?.map((blog, index) => {
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
          <ProfileCard name={userDataFirebase.name} image={userDataFirebase.profilePic} bio={userDataFirebase.bio} isButtonVisible={true} />
        </Box>
      </Box>
    </Box>
  );
}

BlogsPage.getLayout = function getLayout(page) {
  return (
    <UserProvider>
      < Layout > {page}</Layout >
    </UserProvider>
  )
};