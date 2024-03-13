import { FC, useState } from "react";
import MainPage from "./pages/MainPage";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage";
import { FavoritesPage } from "./pages/FavouritesPage";
import { OfferPage } from "./pages/OfferPage";
import NotFoundPage from "./pages/NotFoundPage";
import User from "./types/user";
import Private from "./components/Private";

const App: FC = () => {
    const [user, setUser] = useState<User | null>(null)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<MainPage activeOffers={69}/>} />
                    <Route path="login" element={<LoginPage/>} />
                    <Route path="offer/:id" element={<OfferPage />} />
                    <Route path="favourites" element={
                        <Private user={user}>
                            <FavoritesPage />
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