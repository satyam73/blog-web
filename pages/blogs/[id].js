import React from 'react';
import dynamic from 'next/dynamic';

const FroalaEditorView = dynamic(() => import('react-froala-wysiwyg/FroalaEditorView'), { ssr: false });

import { getAllDocs, getDataById } from '@/app/firebase/db/db'

export default function BlogPost({ post }) {
  console.log(post)
  return (
    <>
      <div>{post.title}</div>
      <FroalaEditorView model={post.content} style={{ fontFamily: 'Montserrat' }} />
    </>
  )
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { result, error } = await getAllDocs('blogs')

  // Get the paths we want to pre-render based on posts
  const paths = result.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { result: post, error } = await getDataById(params.id, 'blogs')
  console.log('ln 32 ', post)
  // Pass post data to the page via props
  return { props: { post: post } }
}