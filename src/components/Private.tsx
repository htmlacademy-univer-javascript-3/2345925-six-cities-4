import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../types/user';

export interface PrivateProps {
    user: User | undefined;
    toUrl: string;
    children: JSX.Element | JSX.Element[];
}

const Private: FC<PrivateProps> = ({user, toUrl, children}) => {

  if(user === undefined) {
    return <Navigate to={toUrl} />;
  }
  return children;

};

export default Private;
