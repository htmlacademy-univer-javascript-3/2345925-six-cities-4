import { City, Offer } from '../types/offer';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeOffersList } from './actions';
import { OFFERS_DATA } from '../mock/offers';
import { CITIES_DATA } from '../const/cities';

interface StoreState {
  city: City;
  offersList: Offer[];
}

const initialState: StoreState = {
  city: CITIES_DATA[0],
  offersList: OFFERS_DATA,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffersList, (state, action) => {
      state.offersList = action.payload;
    });
});
