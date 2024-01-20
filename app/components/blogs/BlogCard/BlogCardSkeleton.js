import React from 'react';
import { Skeleton } from '@mui/material';

export default function BlogCardSkeleton() {
  return (
    <Skeleton
      height={155}
      variant={'rounded'}
      sx={{ width: '100%', borderRadius: '10px', marginTop: '15px' }}
    />
  );
}
