import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';
import { ThunkConfig } from '.';
import { GET_USER, GET_OFFERS_URL, LOG_OUT, LOG_IN } from '../const/apiConsts';
import { AuthStatus } from '../types/authStatus';
import { User } from '../types/user';
import { setAuthToken } from '../api';


export const changeCity = createAction<City>('offers/changeCity');

export const changeOffersList = createAction<Offer[] | undefined>('offers/changeOffersList');

export const changeActiveOfferId = createAction<string | undefined>('offers/changeAvticeOfferId');

export const changeAuthStatus = createAction<AuthStatus>('auth/changeAuthStatus');

export const changeUser = createAction<User | undefined>('auth/changeUser');

export const fetchOffersList = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffersList', async (
  _,
  { extra, dispatch }
) => {
  const response = await extra.get<Offer[]>(GET_OFFERS_URL);
  dispatch(changeOffersList(response.data));
});

export const getUser = createAsyncThunk<void, undefined, ThunkConfig>('auth/getUser', async (
  _,
  { extra, dispatch }
) => {
  const response = await extra.get<User>(GET_USER);
  if(response.status === 401) {
    dispatch(changeAuthStatus(AuthStatus.NOT_AUTORIZED));
    dispatch(changeUser(response.data));
    return;
  }
  dispatch(changeAuthStatus(AuthStatus.AUTHORIZED));
  dispatch(changeUser(undefined));
});

export const logIn = createAsyncThunk<boolean, { email: string; password: string }, ThunkConfig>('auth/logIn', async (
  { email, password },
  { extra, dispatch }
) => {
  const response = await extra.post<User>(LOG_IN, { email, password });
  if(response.status === 201) {
    dispatch(changeAuthStatus(AuthStatus.AUTHORIZED));
    dispatch(changeUser(response.data));
    setAuthToken(response.data.token);
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
    dispatch(changeAuthStatus(AuthStatus.NOT_AUTORIZED));
    dispatch(changeUser(undefined));
    setAuthToken(undefined);
  }
});

