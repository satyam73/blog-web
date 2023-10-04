import { Box } from "@mui/material"
import Layout from "@/components/common/Layout/Layout"
import styles from '@/styles/blogs.module.css';
import BlogCard from "@/components/blogs/BlogCard/BlogCard";

export default function BlogsPage() {
  return <Box className={styles.blogs}>
    <BlogCard />
  </Box>
}


BlogsPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}