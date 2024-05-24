import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import NotFoundPage from '../not-found/NotFoundPage';
import FavouriteButton from '../../components/FavouriteButton';
import CommentForm from './components/CommentForm';
import CommentsList from './components/CommentsList';
import NearbyOffersList from './components/NearbyOffersList';
import { Map } from '../../components/Map';
import { axiosInstance } from '../../api';
import { GET_COMMENTS, GET_OFFERS } from '../../const/apiConsts';
import { offerToMapPoint } from '../../utils/mapUtils';
import { selectAuthStatus, selectOffersList } from '../../state/selectors';
import { AuthStatus } from '../../types/authStatus';
import { FullOfferInfo } from '../../types/fullOfferInfo';
import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';

const MAX_PREVIEW_IMAGES = 6;
const MAX_NEARBY_OFFERS = 3;
const PRO_HOST_CLASS = 'offer__avatar-wrapper--pro';

const OfferPage: FC = () => {
  const { id } = useParams();
  const allOffers = useSelector(selectOffersList);
  const authStatus = useSelector(selectAuthStatus);

  const [offerInfo, setOfferInfo] = useState<FullOfferInfo | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [nearbyOffers, setNearbyOffers] = useState<Offer[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const [offerResponse, commentsResponse, nearbyResponse] = await Promise.all([
        axiosInstance.get<FullOfferInfo>(`${GET_OFFERS}/${id}`),
        axiosInstance.get<Comment[]>(`${GET_COMMENTS}/${id}`),
        axiosInstance.get<Offer[]>(`${GET_OFFERS}/${id}/nearby`)
      ]);

      setOfferInfo(offerResponse.data);
      setComments(commentsResponse.data);
      setNearbyOffers(nearbyResponse.data.slice(0, MAX_NEARBY_OFFERS));
    } catch (err) {
      setNotFound(true);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, allOffers]);

  const memoizedOfferInfo = useMemo(() => offerInfo, [offerInfo]);
  const memoizedComments = useMemo(() => comments, [comments]);
  const memoizedNearbyOffers = useMemo(() => nearbyOffers, [nearbyOffers]);

  if (notFound) {
    return <NotFoundPage />;
  }

  if (!memoizedOfferInfo) {
    return <Spinner sizeInPixels={100} />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {memoizedOfferInfo.images.slice(0, MAX_PREVIEW_IMAGES).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {memoizedOfferInfo.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{memoizedOfferInfo.title}</h1>
                <FavouriteButton id={memoizedOfferInfo.id} isFavourite={memoizedOfferInfo.isFavorite} stylePrefix="offer" width={31} height={33} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(memoizedOfferInfo.rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{memoizedOfferInfo.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{memoizedOfferInfo.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{memoizedOfferInfo.bedrooms} Bedroom{memoizedOfferInfo.bedrooms !== 1 ? 's' : ''}</li>
                <li className="offer__feature offer__feature--adults">Max {memoizedOfferInfo.maxAdults} adult{memoizedOfferInfo.maxAdults !== 1 ? 's' : ''}</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{memoizedOfferInfo.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {memoizedOfferInfo.goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className={`offer__avatar-wrapper ${memoizedOfferInfo.host.isPro ? PRO_HOST_CLASS : ''} user__avatar-wrapper`}>
                  <img className="offer__avatar user__avatar" src={memoizedOfferInfo.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">{memoizedOfferInfo.host.name}</span>
                <span className="offer__user-status">{memoizedOfferInfo.host.isPro ? 'Pro' : ''}</span>
                <div className="offer__description">
                  <p className="offer__text">{memoizedOfferInfo.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <CommentsList reviews={memoizedComments} />
                {authStatus === AuthStatus.AUTHORIZED ?
                  <CommentForm offerId={memoizedOfferInfo.id}
                    afterFormSend={() => {
                      fetchData();
                    }}
                  />
                  :
                  <div />}
              </section>
            </div>
          </div>
          {memoizedNearbyOffers.length > 0 ? (
            <section className="offer__map map" style={{ width: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
              <Map city={memoizedOfferInfo.city} points={[...memoizedNearbyOffers, memoizedOfferInfo].map(offerToMapPoint)} selectedPointId={memoizedOfferInfo.id} />
            </section>
          ) : (
            <Spinner sizeInPixels={100} />
          )}
        </section>
        {memoizedNearbyOffers.length > 0 && (
          <div className="container">
            <section className="near-places places">
              <NearbyOffersList offers={memoizedNearbyOffers} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default OfferPage;
