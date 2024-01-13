import { Box, Typography } from '@mui/material';
import Layout from '@/app/components/common/Layout/Layout';
import styles from '@/styles/blogs.module.css';
import BlogCard from '@/app/components/blogs/BlogCard/BlogCard';
import ProfileCard from '@/app/components/ProfileCard/ProfileCard';

export default function BlogsPage() {
  return (
    <Box className={styles.blogs}>
      <Typography component='h2' className={styles['blogs__heading']}>
        Explore Blogs
      </Typography>
      <Box className={styles['blogs__main']}>
        <Box className={styles['main__container']}>
          {Array(4)
            .fill('blog-card')
            .map((elem, index) => {
              return (
                <BlogCard
                  title='Free Stock Photos, Royalty Free Stock Images & Copyright'
                  image='/assets/dummy.jpg'
                  key={elem + index}
                />
              );
            })}
        </Box>
        <Box className={styles['main__sidebar']}>
          <ProfileCard />
        </Box>
      </Box>
    </Box>
  );
}

BlogsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
