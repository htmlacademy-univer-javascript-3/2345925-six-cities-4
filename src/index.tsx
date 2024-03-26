import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OFFERS_DATA } from './mock/offers';
import { FAVOURITES_IDS } from './mock/favourites';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OFFERS_DATA} favouriteIds={FAVOURITES_IDS}/>
  </React.StrictMode>
);
