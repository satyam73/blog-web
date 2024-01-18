import { Box } from "@mui/material";
import BlogCardPresentation from "./BlogCardPresentation";

export default function BlogCard({ id, title, image }) {
  return <BlogCardPresentation id={id} title={title} image={image} />;
}