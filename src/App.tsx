import { FC, useState } from "react";
import MainPage from "./pages/MainPage";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage";
import { FavoritesPage } from "./pages/FavouritesPage";
import { OfferPage } from "./pages/OfferPage";
import NotFoundPage from "./pages/NotFoundPage";
import User from "./types/user";
import Private from "./components/Private";
import { OfferData } from "./components/main-page/Card";
import { FAVOURITES_IDS } from "./mock/favourites";

export interface AppProps {
    offers: OfferData[];
    favouriteIds: number[]
}

const App: FC<AppProps> = ({ offers }) => {
    const [user, setUser] = useState<User | null>({id: "1", username: "Dima"})

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<MainPage offers={offers} activeOffers={69}/>} />
                    <Route path="login" element={<LoginPage/>} />
                    <Route path="offer/:id" element={<OfferPage />} />
                    <Route path="favourites" element={
                        <Private user={user}>
                            <FavoritesPage offers={
                                offers.filter(
                                    ( offer => 
                                        FAVOURITES_IDS.find(id => id == offer.id) != undefined
                                    )
                                )
                            }/>
                        </Private>
                        } 
                    />
                </Route>
                <Route path="*" element={<NotFoundPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App