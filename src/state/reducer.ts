import { combineReducers } from '@reduxjs/toolkit';
import { cityReducer } from './city/city-reducer';
import { offerReducer } from './offer/offer-reducer';
import { userReducer } from './user/user-reducer';

export const rootReducer = combineReducers({
  cityState: cityReducer,
  offerState: offerReducer,
  userState: userReducer,
});
