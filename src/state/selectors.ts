import { State } from '.';

export const selectCurrentCity = (state: State) => state.city;
export const selectOffersList = (state: State) => state.offersList;
