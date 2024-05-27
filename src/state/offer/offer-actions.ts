import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { ThunkConfig } from '..';
import { CHANGE_FAVOURITE_STATUS, GET_OFFERS } from '../../const/api-const';
import { FavouriteStatus } from '../../types/favourite-status';

export const changeOffersList = createAction<Offer[] | undefined>('offers/changeOffersList');

export const changeActiveOfferId = createAction<string | undefined>('offers/changeAvticeOfferId');

export const fetchOffersList = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffersList', async (
  _,
  { extra, dispatch }
) => {
  const response = await extra.get<Offer[]>(GET_OFFERS);
  dispatch(changeOffersList(response.data));
});

export const changeFavouriteStatus = createAsyncThunk<void, { offerId: string; newStatus: FavouriteStatus }, ThunkConfig>('offer/changeFavouriteStatus', async (
  { offerId, newStatus },
  { extra, dispatch, getState }
) => {
  const response = await extra.post<Offer>(`${CHANGE_FAVOURITE_STATUS}/${offerId}/${newStatus}`);
  if(response.status === 200 || response.status === 201) {
    const offers = getState().offerState.offersList;
    const newOffers = (offers ? offers : []).map((offer) => {
      if(offer.id === offerId) {
        return {...offer, isFavorite: response.data.isFavorite};
      }
      return {...offer};
    });
    dispatch(changeOffersList([...newOffers]));
  }
});
