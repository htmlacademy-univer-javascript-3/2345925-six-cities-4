import { FC, useState } from 'react';
import OffersList from '../../components/offers/OffersList';
import { Link } from 'react-router-dom';
import { FAVOURITES_URL } from '../../const/url';
import { Map, MapPoint } from '../../components/Map';
import { City, Offer } from '../../types/offer';
import { offerToMapPoint } from '../../utils/mapUtils';
import { CitiesTabs } from './components/CitiesTab';
import { CITIES_DATA } from '../../const/cities';
import { useSelector } from 'react-redux';
import { selectActiveOfferId, selectCurrentCity, selectOffersList } from '../../state/selectors';
import SortingSelect, { SortType } from './components/SortingSelect';

const sortFunctions: Record<SortType, (a: Offer, b: Offer) => number> = {
  [SortType.LOW_PRICE_FIRST]: (a, b) => a.price - b.price,
  [SortType.HIGH_PRICE_FIRST]: (a, b) => b.price - a.price,
  [SortType.TOP_RATED_FIRST]: (a, b) => b.rating - a.rating,
  [SortType.POPULAR]: () => 1,
};

const MainPage: FC = () => {

  const [sortType, setSortType] = useState<SortType>(SortType.POPULAR);
  const city: City = useSelector(selectCurrentCity);

  const offers = useSelector(selectOffersList).filter((it) => it.city.name === city.name);
  const activeOfferId = useSelector(selectActiveOfferId);
  const sortedOffers = offers.sort(sortFunctions[sortType]);

  const points: MapPoint[] = offers.map((offer: Offer) => offerToMapPoint(offer));

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={FAVOURITES_URL}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs cities={CITIES_DATA}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found"> {offers.length ?? 0} places to stay in Amsterdam</b>
              <SortingSelect onSortSelected={setSortType}/>
              <OffersList offers={sortedOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} points={points} selectedPointId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
