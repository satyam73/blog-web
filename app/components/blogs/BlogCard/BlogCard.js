import { useRouter } from "next/router";
import BlogCardPresentation from "./BlogCardPresentation";

export default function BlogCard({ id, title, image, isEditMode }) {
  const router = useRouter();

  function onEditClick() {
    router.push(`/blogs/${id}/edit`)
  }

  return <BlogCardPresentation id={id} title={title} image={image} isEditMode={isEditMode} onEditClick={onEditClick} />;
}