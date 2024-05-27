import { State } from '.';

export const selectCurrentCity = (state: State) => state.cityState.city;
export const selectOffersList = (state: State) => state.offerState.offersList;
export const selectActiveOfferId = (state: State) => state.offerState.activeOfferId;
export const selectAuthStatus = (state: State) => state.userState.authStatus;
export const selectCurrentUser = (state: State) => state.userState.user;
