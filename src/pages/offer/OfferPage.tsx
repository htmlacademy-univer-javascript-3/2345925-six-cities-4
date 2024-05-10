import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentForm } from './components/CommentForm';
import { CommentsList } from './components/CommentsList';
import { Map } from '../../components/Map';
import { offerToMapPoint } from '../../utils/mapUtils';
import Header from '../../components/Header';
import { axiosInstance } from '../../api';
import { GET_COMMENTS, GET_OFFERS } from '../../const/apiConsts';
import { FullOfferInfo } from '../../types/fullOfferInfo';
import { Offer } from '../../types/offer';
import { MAIN_URL } from '../../const/url';
import Spinner from '../../components/Spinner';
import { Comment } from '../../types/comment';
import NearbyOffersList from './components/NearbyOffersList';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../state/selectors';
import { AuthStatus } from '../../types/authStatus';


export const OfferPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offerInfo, setOfferInfo] = useState<FullOfferInfo | undefined>(undefined);
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [nearbyOffers, setNearbyOffers] = useState<Offer[] | undefined>(undefined);
  const authStatus = useSelector(selectAuthStatus);

  const getComments = async () => {
    try {
      const response = await axiosInstance.get<Comment[]>(`${GET_COMMENTS}/${id}`);
      setComments(response.data);
    } catch (err) {
      navigate(MAIN_URL);
    }
  };
  const getOfferInfo = async () => {
    try {
      const response = await axiosInstance.get<FullOfferInfo>(`${GET_OFFERS}/${id}`);
      setOfferInfo(response.data);
    } catch (err) {
      navigate(MAIN_URL);
    }
  };
  const getNearbyOffers = async () => {
    try {
      const response = await axiosInstance.get<Offer[]>(`${GET_OFFERS}/${id}/nearby`);
      setNearbyOffers(response.data.slice(0, 3));
    } catch (err) {
      navigate(MAIN_URL);
    }
  };

  useEffect(() => {
    getOfferInfo();
    getNearbyOffers();
    getComments();
  }, [id]);


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        {offerInfo ?
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offerInfo?.images.map((image) =>
                  (
                    <div className="offer__image-wrapper" key={image}>
                      <img
                        className="offer__image"
                        src={image}
                        alt="Photo studio"
                      />
                    </div>)
                )}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__mark">
                  <span>{offerInfo.isPremium === true ? 'Premium' : ''}</span>
                </div>
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offerInfo.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${offerInfo.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offerInfo.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offerInfo.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offerInfo.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offerInfo.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offerInfo.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offerInfo.goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offerInfo.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offerInfo.host.name}</span>
                    <span className="offer__user-status">{offerInfo.host.isPro}</span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offerInfo.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <CommentsList reviews={comments} />
                  {
                    authStatus === AuthStatus.AUTHORIZED ?
                      <CommentForm offerId={offerInfo.id} afterFormSend={() => {
                        getComments();
                      }}
                      />
                      :
                      <div />
                  }
                </section>
              </div>
            </div>
            {
              nearbyOffers ?
                <section className="offer__map map" style={{width: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
                  <Map
                    city={offerInfo.city}
                    points={[...nearbyOffers, offerInfo].map((it) => offerToMapPoint(it))}
                    selectedPointId={offerInfo.id}
                  />
                </section>
                :
                <Spinner sizeInPixels={100}/>
            }
          </section>
          :
          <Spinner sizeInPixels={100}/>}
        {
          nearbyOffers !== undefined && offerInfo !== undefined ?
            <div className="container">
              <section className="near-places places">
                <NearbyOffersList offers={nearbyOffers} />
              </section>
            </div>
            :
            <div/>
        }
      </main>
    </div>
  );
};
