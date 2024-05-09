import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

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
    <div className="place-card__mark">
      <span>{offer.isPremium === true ? 'Premium' : ''}</span>
    </div>
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={offer.previewImage}
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
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className="place-card__bookmark-button place-card__bookmark-button--active button"
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            To bookmarks
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
        <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);

export default Card;
