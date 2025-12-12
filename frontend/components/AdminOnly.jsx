import { memo } from 'react';
import ProtectedRoute from './ProtectedRoute';

const AdminOnly = ({children}) => {
  return <ProtectedRoute adminOnly>{children}</ProtectedRoute>;
};

export default memo(AdminOnly);