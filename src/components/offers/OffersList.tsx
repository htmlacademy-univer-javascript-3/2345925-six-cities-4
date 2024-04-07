import { FC, useState } from 'react';
import { Offer } from '../../types/offer';
import Card from './OfferCard';

export interface OffersListProps {
    offers: Offer[];
}

const OffersList: FC<OffersListProps> = ({
  offers
}) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <Card key={card.id} offer={card} onMouseEnter={setActiveOfferId}/>
      ))}
    </div>
  );
};

export default OffersList;
