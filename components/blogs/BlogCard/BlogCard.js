import { Box } from "@mui/material";
import BlogCardPresentation from "./BlogCardPresentation";

export default function BlogCard() {
  return (<>
    {Array(1).fill(' ').map(() => <BlogCardPresentation
      title={'Free Stock Photos, Royalty Free Stock Images & Copyright '}
      image={'/assets/dummy.jpg'} />)}
  </>)
}