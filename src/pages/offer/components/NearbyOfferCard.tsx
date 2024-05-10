import { FC } from 'react';
import { Offer } from '../../../types/offer';
import { Link } from 'react-router-dom';
import { OFFER_URL } from '../../../const/url';
import FavouriteButton from '../../../components/FavouriteButton';

const NearbyOfferCard: FC<{ offer: Offer }> = ({ offer }) => (
  <article className="near-places__card place-card">
    <div className="near-places__image-wrapper place-card__image-wrapper">
      <Link to={`${OFFER_URL}/${offer.id}`}>
        <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{offer.price}</b>
          <span className="place-card__price-text">/&nbsp;night</span>
        </div>
        <FavouriteButton isFavourite={offer.isFavorite} id={offer.id}/>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{
            width: `${offer.rating * 20}%`,
          }}
          >
          </span>
          <span className="visually-hidden">{offer.rating}</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`${OFFER_URL}/${offer.id}`}>{offer.title}</Link>
      </h2>
      <p className="place-card__type">Room</p>
    </div>
  </article>
);

export default NearbyOfferCard;
