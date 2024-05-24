import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';
import { ThunkConfig } from '.';
import { GET_USER, GET_OFFERS, LOG_OUT, LOG_IN, CHANGE_FAVOURITE_STATUS } from '../const/apiConsts';
import { AuthStatus } from '../types/authStatus';
import { User } from '../types/user';
import { setAuthToken } from '../api';
import { FavouriteStatus } from '../types/favouriteStatus';


export const changeCity = createAction<City>('offers/changeCity');

export const changeOffersList = createAction<Offer[] | undefined>('offers/changeOffersList');

export const changeActiveOfferId = createAction<string | undefined>('offers/changeAvticeOfferId');

export const changeAuthStatus = createAction<AuthStatus>('auth/changeAuthStatus');

export const changeUser = createAction<User | undefined>('auth/changeUser');

export const fetchOffersList = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffersList', async (
  _,
  { extra, dispatch }
) => {
  const response = await extra.get<Offer[]>(GET_OFFERS);
  dispatch(changeOffersList(response.data));
});

export const fetchUser = createAsyncThunk<void, undefined, ThunkConfig>('auth/getUser', async (
  _,
  { extra, dispatch }
) => {
  const response = await extra.get<User>(GET_USER);
  if(response.status === 401) {
    dispatch(changeAuthStatus(AuthStatus.NOT_AUTORIZED));
    dispatch(changeUser(undefined));
    return;
  }
  dispatch(changeAuthStatus(AuthStatus.AUTHORIZED));
  dispatch(changeUser(response.data));
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
    dispatch(changeAuthStatus(AuthStatus.NOT_AUTORIZED));
    dispatch(changeUser(undefined));
    setAuthToken(undefined);
    dispatch(fetchOffersList());
  }
});

export const changeFavouriteStatus = createAsyncThunk<void, { offerId: string; newStatus: FavouriteStatus }, ThunkConfig>('favourite/changeStatus', async (
  { offerId, newStatus },
  { extra, dispatch, getState }
) => {
  const response = await extra.post<Offer>(`${CHANGE_FAVOURITE_STATUS}/${offerId}/${newStatus}`);
  if(response.status === 200 || response.status === 201) {
    const offers = getState().offersList;
    const newOffers = (offers ? offers : []).map((offer) => {
      if(offer.id === offerId) {
        return {...offer, isFavorite: response.data.isFavorite};
      }
      return {...offer};
    });
    dispatch(changeOffersList([...newOffers]));
  }
});
