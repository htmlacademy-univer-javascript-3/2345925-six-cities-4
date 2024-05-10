import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';
import { ThunkConfig } from '.';
import { GET_OFFERS_URL } from '../const/apiConsts';


export const changeCity = createAction<City>('offers/changeCity');

export const changeOffersList = createAction<Offer[] | undefined>('offers/changeOffersList');

export const changeActiveOfferId = createAction<string | undefined>('offers/changeAvticeOfferId');

export const fetchOffersList = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffersList', async (
  _,
  {extra, dispatch}
) => {
  const response = await extra.get<Offer[]>(GET_OFFERS_URL);
  dispatch(changeOffersList(response.data));
});
