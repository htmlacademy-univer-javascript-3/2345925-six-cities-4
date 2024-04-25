import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';


export const changeCity = createAction<City>('offers/changeCity');

export const changeOffersList = createAction<Offer[]>('offers/changeOffersList');