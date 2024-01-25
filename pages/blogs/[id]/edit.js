import AuthGuard from '@/app/components/AuthGuard/AuthGuard';
import EditGuard from '@/app/components/EditGuard/EditGuard';
import Layout from '@/app/components/common/Layout/Layout';
import ToastProvider from '@/app/contexts/ToastProvider';
import UserProvider from '@/app/contexts/UserProvider';
import { getAllDocs, getDataById } from '@/app/firebase/db/db';
import { useRouter } from 'next/router';
import React from 'react'

export default function EditPost() {
  const router = useRouter();

  return (
    <div>EditPost page</div>
  )
}

EditPost.getLayout = function getLayout(page) {
  return (
    <ToastProvider>
      <UserProvider>
        <AuthGuard>
          <EditGuard>
            <Layout>{page}</Layout>
          </EditGuard>
        </AuthGuard>
      </UserProvider>
    </ToastProvider>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { result, error } = await getAllDocs('blogs');

  // Get the paths we want to pre-render based on posts
  const paths = result.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { result: post, error } = await getDataById(params.id, 'blogs');
  const { result: author, } = await getDataById(post.createdBy, 'users');

  // Pass post data to the page via props
  return { props: { post, author } };
}