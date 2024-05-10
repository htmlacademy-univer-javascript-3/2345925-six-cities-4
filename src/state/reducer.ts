import { City, Offer } from '../types/offer';
import { createReducer } from '@reduxjs/toolkit';
import { changeActiveOfferId, changeAuthStatus, changeCity, changeOffersList, changeUser } from './actions';
import { CITIES_DATA } from '../const/cities';
import { AuthStatus } from '../types/authStatus';
import { User } from '../types/user';

interface StoreState {
  city: City;
  offersList: undefined | Offer[];
  activeOfferId: undefined | string;
  authStatus: AuthStatus;
  user: User | undefined;
}

const initialState: StoreState = {
  city: CITIES_DATA[0],
  offersList: undefined,
  activeOfferId: undefined,
  authStatus: AuthStatus.NOT_AUTORIZED,
  user: undefined
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(changeActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(changeUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(changeAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    });
});
