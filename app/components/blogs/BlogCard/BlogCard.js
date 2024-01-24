import { useRouter } from "next/router";
import BlogCardPresentation from "./BlogCardPresentation";

export default function BlogCard({ id, title, image, isEditMode }) {
  const router = useRouter();

  function onEditClick(e) {
    e.stopPropagation();
    router.push(`/blogs/${id}/edit`);
  }

  function onPostClick() {
    router.push(`/blogs/${id}`);
  }

  return <BlogCardPresentation id={id} title={title} image={image} isEditMode={isEditMode} onEditClick={onEditClick} onPostClick={onPostClick} />;
}