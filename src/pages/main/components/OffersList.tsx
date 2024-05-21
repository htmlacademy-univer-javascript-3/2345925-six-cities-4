import { FC, useEffect, useState } from 'react';
import { Offer } from '../../../types/offer';
import Card from './OfferCard';
import { useDispatch } from 'react-redux';
import { changeActiveOfferId } from '../../../state/actions';

export interface OffersListProps {
    offers: Offer[];
}

const OffersList: FC<OffersListProps> = ({
  offers
}) => {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeActiveOfferId(activeOfferId));
  }, [activeOfferId, dispatch]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <Card key={card.id} offer={card} onMouseEnter={setActiveOfferId} onMouseLeave={() => setActiveOfferId(undefined)}/>
      ))}
    </div>
  );
};

export default OffersList;
