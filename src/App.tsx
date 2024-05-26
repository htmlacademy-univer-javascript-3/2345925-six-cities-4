import { FC } from 'react';
import MainPage from './pages/main/main-page';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginPage } from './pages/login/login-page';
import { FavoritesPage } from './pages/favourites/favourites-page';
import OfferPage from './pages/offer/offer-page';
import NotFoundPage from './pages/not-found/not-found-page';
import { FAVOURITES_URL, LOGIN_URL, MAIN_URL, OFFER_URL } from './const/url';
import { useAppDispatch } from './state';
import Private from './components/private';
import { fetchOffersList } from './state/offer/offer-actions';
import { fetchUser } from './state/user/user-actions';

export interface AppProps {
}

const App: FC<AppProps> = () => {
  const dispatch = useAppDispatch();
  dispatch(fetchOffersList());
  dispatch(fetchUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route path={MAIN_URL}>
          <Route index element={<MainPage/>} />
          <Route path={LOGIN_URL} element={<LoginPage/>} />
          <Route path={`${OFFER_URL}/:id`} element={<OfferPage />} />
          <Route path={FAVOURITES_URL} element={
            <Private toUrl={LOGIN_URL}>
              <FavoritesPage />
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
