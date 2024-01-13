import { Box } from "@mui/material";
import BlogCardPresentation from "./BlogCardPresentation";

export default function BlogCard({ title, image }) {
  return <BlogCardPresentation title={title} image={image} />;
}