import { State } from '.';

export const selectCurrentCity = (state: State) => state.city;
export const selectOffersList = (state: State) => state.offersList;
export const selectActiveOfferId = (state: State) => state.activeOfferId;
export const selectAuthStatus = (state: State) => state.authStatus;
export const selectCurrentUser = (state: State) => state.user;
