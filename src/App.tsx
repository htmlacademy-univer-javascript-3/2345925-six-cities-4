import { FC, useState } from 'react';
import MainPage from './pages/main/MainPage';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { FavoritesPage } from './pages/favourites/FavouritesPage';
import { OfferPage } from './pages/offer/OfferPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import { User } from './types/user';
import Private from './components/Private';
import { FAVOURITES_URL, LOGIN_URL, OFFER_URL } from './const/url';
import { Offer } from './types/offer';

export interface AppProps {
    offers: Offer[];
}

const App: FC<AppProps> = ({ offers }) => {
  const [user, setUser] = useState<User | null>({id: '1', username: 'Dima'});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage/>} />
          <Route path={LOGIN_URL} element={<LoginPage/>} />
          <Route path={`${OFFER_URL}/:id`} element={<OfferPage />} />
          <Route path={FAVOURITES_URL} element={
            <Private user={user}>
              <FavoritesPage offers={
                offers.filter((offer) => offer.isFavorite)
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
