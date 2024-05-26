import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { changeActiveOfferId, changeOffersList } from './offer-actions';

interface OffersState {
  offersList: Offer[] | undefined;
  activeOfferId: string | undefined;
}

const initialOffersState: OffersState = {
  offersList: undefined,
  activeOfferId: undefined,
};

export const offerReducer = createReducer(initialOffersState, (builder) => {
  builder
    .addCase(changeOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(changeActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    });
});
