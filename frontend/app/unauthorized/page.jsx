import { memo } from 'react';

const Unauthorized = () => {
  return (
    <div className='p-6 text-center'>
      <h1 className='text-3xl font-bold text-red-600'>Access Denied</h1>
      <p className='mt-2 text-gray-700'>You do not have the necessary permissions to view this page.</p>
    </div>
  );
};

export default memo(Unauthorized);