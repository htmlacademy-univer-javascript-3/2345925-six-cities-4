import { FC, useCallback, useEffect, useState } from 'react';
import { Offer } from '../../../types/offer';
import Card from './offer-card';
import { useDispatch } from 'react-redux';
import React from 'react';
import { changeActiveOfferId } from '../../../state/offer/offer-actions';

export interface OffersListProps {
    offers: Offer[];
}

const OffersList: FC<OffersListProps> = ({
  offers
}) => {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  const handleMouseEnter = useCallback((id: string | undefined) => {
    setActiveOfferId(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveOfferId(undefined);
  }, []);

  useEffect(() => {
    dispatch(changeActiveOfferId(activeOfferId));
  }, [activeOfferId, dispatch]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <Card key={card.id} offer={card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
      ))}
    </div>
  );
};

const MemoOfferList = React.memo(OffersList);

export default MemoOfferList;
