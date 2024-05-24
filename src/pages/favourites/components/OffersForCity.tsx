/* eslint-disable react/jsx-no-useless-fragment */
import { FC } from 'react';
import FavouritesOffer from './FavouritesOffer';
import { Offer } from '../../../types/offer';
import React from 'react';

export interface OffresForCityProps {
    offers: Offer[] | null;
    city: string;
}

const OffersForCity: FC<OffresForCityProps> = ({ offers, city }) => {

  if(!offers) {
    return (
      <></>
    );
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{ city }</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavouritesOffer offer={offer} key={offer.id}/>
        ))}
      </div>
    </li>
  );
};

const memoOffersForCity = React.memo(OffersForCity, (prev, next) => prev.city === next.city && prev.offers?.length === next.offers?.length);

export default memoOffersForCity;
