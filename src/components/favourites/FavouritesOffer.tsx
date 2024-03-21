import { FC } from "react";
import { OfferData } from "../main-page/Card";
import { Link } from "react-router-dom";


export interface FavouritesOfferProps {
    offer: OfferData
}

export const FavouritesOffer: FC<FavouritesOfferProps> = ({ offer }) => {

    return (
        <article className="favorites__card place-card">
                <div className="favorites__image-wrapper place-card__image-wrapper">
                <a href="#">
                    <img
                    className="place-card__image"
                    src={offer.image}
                    width="150"
                    height="110"
                    alt="Place image"
                    />
                </a>
                </div>
                <div className="favorites__card-info place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                    <b className="place-card__price-value">&euro;{offer.price}</b>
                    <span className="place-card__price-text">
                        &#47;&nbsp;{offer.priceText}
                    </span>
                    </div>
                    <button
                    className="place-card__bookmark-button place-card__bookmark-button--active button"
                    type="button"
                    >
                    <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                    >
                        <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">
                        {offer.bookmarked ? 'In' : 'To'} bookmarks
                    </span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                    <span style={{ width: `${offer.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`/offer/${offer.id}`}>White castle</Link>
                </h2>
                <p className="place-card__type">{offer.type}</p>
                </div>
            </article>
    )
}