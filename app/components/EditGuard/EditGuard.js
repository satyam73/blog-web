import { useUser } from '@/app/contexts/UserProvider';
import { getDataById } from '@/app/firebase/db/db';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditGuard({ children }) {
  const { user, userDataFirebase, loading } = useUser();
  const router = useRouter();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditPermissionGranted, setIsEditPermissionGranted] = useState(false);
  const { id: postId } = router.query;

  useEffect(() => {
    (async function checkEditPermission() {
      setIsLoading(true);
      try {
        const { result, error } = await getDataById(postId, 'blogs');

        if (error) throw error;

        setPost(result)
        console.log(result);
        if (userDataFirebase?.id === result.createdBy) {
          setIsEditPermissionGranted(true)
        } else {
          setIsEditPermissionGranted(false)
        }
      } catch (error) {
        console.error('Something went wrong while checking edit permission on post ', error);
      } finally {
        setIsLoading(false);
      }
    })();

  }, [loading]);

  console.log(isEditPermissionGranted, userDataFirebase?.id, post)
  return (
    <div>{isEditPermissionGranted ? children : 'unauthorized to edit the post'}</div>
  )
}

