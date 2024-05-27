import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '..';
import { AuthStatus } from '../../types/auth-status';
import { User } from '../../types/user';
import { GET_USER, LOG_IN, LOG_OUT } from '../../const/api-const';
import { setAuthToken } from '../../api';
import { fetchOffersList } from '../offer/offer-actions';

export const changeAuthStatus = createAction<AuthStatus>('auth/changeAuthStatus');

export const changeUser = createAction<User | undefined>('auth/changeUser');


export const fetchUser = createAsyncThunk<void, undefined, ThunkConfig>('auth/getUser', async (
  _,
  { extra, dispatch }
) => {
  const response = await extra.get<User>(GET_USER);
  if(response.status === 401) {
    dispatch(changeAuthStatus(AuthStatus.NotAuthorized));
    dispatch(changeUser(undefined));
    return;
  }
  dispatch(changeAuthStatus(AuthStatus.Authorized));
  dispatch(changeUser(response.data));
});

export const logIn = createAsyncThunk<boolean, { email: string; password: string }, ThunkConfig>('auth/logIn', async (
  { email, password },
  { extra, dispatch }
) => {
  const response = await extra.post<User>(LOG_IN, { email, password });
  if(response.status === 201) {
    dispatch(changeAuthStatus(AuthStatus.Authorized));
    dispatch(changeUser(response.data));
    setAuthToken(response.data.token);
    dispatch(fetchOffersList());
    return true;
  }
  return false;
});

export const logOut = createAsyncThunk<void, undefined, ThunkConfig>('auth/logOut', async (
  _,
  {extra, dispatch}
) => {
  const response = (await extra.delete<User>(LOG_OUT));
  if(response.status === 204) {
    dispatch(changeAuthStatus(AuthStatus.NotAuthorized));
    dispatch(changeUser(undefined));
    setAuthToken(undefined);
    dispatch(fetchOffersList());
  }
});
