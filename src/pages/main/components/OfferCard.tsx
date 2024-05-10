import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../../types/offer';
import FavouriteButton from '../../../components/FavouriteButton';

export interface CardProps {
    offer: Offer;
    onMouseEnter?: (id: string) => void;
    onMouseLeave?: () => void;
}


const Card: FC<CardProps> = ({
  offer,
  onMouseEnter,
  onMouseLeave
}) => (
  <article className="cities__card place-card"
    onMouseEnter={() => onMouseEnter !== undefined ? onMouseEnter(offer.id) : {}}
    onMouseLeave={() => onMouseLeave !== undefined ? onMouseLeave() : {}}
  >
    <div className="place-card__mark" hidden={!offer.isPremium}>
      <span>Premium</span>
    </div>
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`/offer/${offer.id}`}>
        <img
          className="place-card__image"
          src={offer.previewImage}
          width="260"
          height="200"
          alt="Place image"
        />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <FavouriteButton isFavourite={offer.isFavorite} id={offer.id}/>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span
            style={{
              width: `${Math.round(offer.rating) * 20}%`,
            }}
          />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>);

export default Card;
