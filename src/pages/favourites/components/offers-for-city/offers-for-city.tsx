import { FC } from 'react';
import React from 'react';
import FavouritesOffer from './favourites-offer';
import { Offer } from '../../../../types/offer';
import { Link } from 'react-router-dom';
import { MAIN_URL } from '../../../../const/url';
import { useAppDispatch } from '../../../../state';
import { changeCity } from '../../../../state/city/city-actions';

export interface OffresForCityProps {
    offers: Offer[] | null;
    city: string;
}

const OffersForCity: FC<OffresForCityProps> = ({ offers, city }) => {

  const dispatch = useAppDispatch();

  if(!offers || offers.length === 0) {
    return (
      <div></div>
    );
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={MAIN_URL} onClick={() => dispatch(changeCity(offers[0].city))}>
            <span>{ city }</span>
          </Link>
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
