import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../types/user';

export interface PrivateProps {
    user: User | null;
    children: JSX.Element | JSX.Element[];
}

const Private: FC<PrivateProps> = ({user, children}) => {

  if(user === null) {
    return <Navigate to="/login" />;
  }
  return children;

};

export default Private;
