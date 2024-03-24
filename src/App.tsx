import { FC, useState } from 'react';
import MainPage from './pages/main/MainPage';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { FavoritesPage } from './pages/favourites/FavouritesPage';
import { OfferPage } from './pages/offer/OfferPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import User from './types/user';
import Private from './components/Private';
import { OfferData } from './pages/main/components/Card';
import { FAVOURITES_URL, LOGIN_URL, OFFER_URL } from './url';

export interface AppProps {
    offers: OfferData[];
    favouriteIds: number[];
}

const App: FC<AppProps> = ({ offers, favouriteIds }) => {
  const [user, setUser] = useState<User | null>({id: '1', username: 'Dima'});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage offers={offers} activeOffers={69}/>} />
          <Route path={LOGIN_URL} element={<LoginPage/>} />
          <Route path={`${OFFER_URL}/:id`} element={<OfferPage />} />
          <Route path={FAVOURITES_URL} element={
            <Private user={user}>
              <FavoritesPage offers={
                offers.filter(
                  ((offer) =>
                    favouriteIds.includes(offer.id)
                  )
                )
              }
              />
            </Private>
          }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
