import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../types/authStatus';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../state/selectors';

export interface PrivateProps {
    toUrl: string;
    children: JSX.Element | JSX.Element[];
}

const Private: FC<PrivateProps> = ({toUrl, children}) => {
  const authStatus = useSelector(selectAuthStatus);
  if(authStatus === AuthStatus.NOT_AUTORIZED) {
    return <Navigate to={toUrl} />;
  }
  return children;

};

export default Private;
