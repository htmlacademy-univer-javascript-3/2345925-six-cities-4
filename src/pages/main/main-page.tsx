import { FC, useCallback, useMemo, useState } from 'react';
import { City, Offer } from '../../types/offer';
import { offerToMapPoint } from '../../utils/map-utils';
import { CITIES_DATA } from '../../const/cities';
import { useSelector } from 'react-redux';
import { selectActiveOfferId, selectCurrentCity, selectOffersList } from '../../state/selectors';
import SortingSelect, { SortType } from './components/sorting-select/sorting-select';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import { MapPoint } from '../../components/map/map';
import OffersList from './components/offers-list/offers-list';
import { Map } from '../../components/map/map';
import CitiesTabs from './components/cities-tab/cities-tab';

const sortFunctions: Record<SortType, (a: Offer, b: Offer) => number> = {
  [SortType.LOW_PRICE_FIRST]: (a, b) => a.price - b.price,
  [SortType.HIGH_PRICE_FIRST]: (a, b) => b.price - a.price,
  [SortType.TOP_RATED_FIRST]: (a, b) => b.rating - a.rating,
  [SortType.POPULAR]: () => 1
};

const sort = (offers: Offer[], sortType: SortType) => {
  if (sortType === SortType.POPULAR) {
    return offers;
  }
  return [...offers].sort(sortFunctions[sortType]);
};

const MainPage: FC = () => {

  const [sortType, setSortType] = useState<SortType>(SortType.POPULAR);
  const city: City = useSelector(selectCurrentCity);
  const allOffers = useSelector(selectOffersList);
  const activeOfferId = useSelector(selectActiveOfferId);
  const offers = useMemo(
    () => allOffers ? allOffers.filter((it) => it.city.name === city.name) : undefined,
    [allOffers, city]
  );
  const sortedOffers = useMemo(
    () => offers ? sort(offers, sortType) : [],
    [offers, sortType]
  );

  const points: MapPoint[] = useMemo(
    () => offers ? offers.map((offer: Offer) => offerToMapPoint(offer)) : [],
    [offers]
  );

  const handleSortSelected = useCallback((type: SortType) => setSortType(type), [setSortType]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs cities={CITIES_DATA}/>
        <div className="cities">
          {
            !offers || offers.length ?
              <div className="cities__places-container container">
                {
                  !offers ?
                    <Spinner sizeInPixels={100}/>
                    :
                    <section className="cities__places places">
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found"> {offers.length ?? 0} places to stay in {city.name}</b>
                      <SortingSelect onSortSelected={handleSortSelected}/>
                      <OffersList offers={sortedOffers} />
                    </section>
                }
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map city={city} points={points} selectedPointId={activeOfferId} />
                  </section>
                </div>
              </div>
              :
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
                  </div>
                </section>
                <div className="cities__right-section" style={{backgroundImage: 'url("/src/const/img/no-places@2x.png")', backgroundSize: 'auto 100%', backgroundPosition: 'right center'}}></div>
              </div>
          }

        </div>
      </main>
    </div>
  );
};

export default MainPage;
