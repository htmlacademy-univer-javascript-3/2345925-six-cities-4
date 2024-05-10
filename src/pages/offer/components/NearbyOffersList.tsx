import { FC } from 'react';
import { Offer } from '../../../types/offer';
import NearbyOfferCard from './NearbyOfferCard';

const NearbyOffersList: FC<{ offers: Offer[] }> = ({ offers }) => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      {
        offers.map((offer) => <NearbyOfferCard offer={offer} key={offer.id}/>)
      }
    </div>
  </section>
);

export default NearbyOffersList;
