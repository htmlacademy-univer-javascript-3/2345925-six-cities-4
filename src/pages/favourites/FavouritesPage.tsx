/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FC } from 'react';
import { OffersForCity } from './components/OffersForCity';
import { Offer } from '../../types/offer';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { selectOffersList } from '../../state/selectors';

export interface FavouritesPageProps {
}

export const FavoritesPage: FC<FavouritesPageProps> = () => {
  const offers = useSelector(selectOffersList);
  const offersByCities = Object.groupBy(offers ? offers : [], (item: Offer) => item.city.name);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(offersByCities).map((city) => (
                <OffersForCity city={city} offers={offersByCities[city] ?? null } key={city}/>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};
