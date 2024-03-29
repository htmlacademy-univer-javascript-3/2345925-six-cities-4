import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface OfferData {
    id: number;
    city: string;
    mark?: string;
    image: string;
    price: number;
    priceText: string;
    description: string;
    type: string;
    rating: number;
    bookmarked: boolean;
}

export interface CardProps {
    offer: OfferData;
    onMouseEnter: (id: number) => void;
}

const Card: FC<CardProps> = ({
  offer,
  onMouseEnter
}) => (
  <article className="cities__card place-card"
    onMouseEnter={() => onMouseEnter(offer.id)}
  >
    {offer.mark && (
      <div className="place-card__mark">
        <span>{offer.mark}</span>
      </div>
    )}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={offer.image}
          width="260"
          height="200"
          alt="Place image"
        />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;{offer.priceText}</span>
        </div>
        <button
          className="place-card__bookmark-button place-card__bookmark-button--active button"
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            {offer.bookmarked ? 'In' : 'To'} bookmarks
          </span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span
            style={{
              width: `${offer.rating * 20}%`,
            }}
          />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${offer.id}`}>{offer.description}</Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);

export default Card;
