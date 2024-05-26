import { createReducer } from '@reduxjs/toolkit';
import { City } from '../../types/offer';
import { CITIES_DATA } from '../../const/cities';
import { changeCity } from './city-actions';

interface CityState {
    city: City;
}

const initialCityState: CityState = {city: CITIES_DATA[0]};


export const cityReducer = createReducer(initialCityState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });
});
