import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FAVOURITES_URL, LOGIN_URL, MAIN_URL } from '../const/url';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectOffersList } from '../state/selectors';
import { useAppDispatch } from '../state';
import { logOut } from '../state/actions';

export interface HeaderProps {
    showSignButton?: boolean;
}

const Header: FC<HeaderProps> = ({showSignButton}) => {
  const toShow = showSignButton !== undefined ? showSignButton : true;
  const user = useSelector(selectCurrentUser);
  const favouriteCount = useSelector(selectOffersList)?.filter((offer) => offer.isFavorite).length;
  const dispatch = useAppDispatch();
  const logOutIfPresent = () => {
    if(user) {
      dispatch(logOut());
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={MAIN_URL}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {user ?
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={FAVOURITES_URL}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user.name}</span>
                    <span className="header__favorite-count">{favouriteCount}</span>
                  </Link>
                </li>
                : <div></div>}
              {toShow ?
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={user ? MAIN_URL : LOGIN_URL}
                    onClick={() => {
                      logOutIfPresent();
                    }}
                  >
                    <span className="header__signout">Sign {user ? 'out' : 'in'}</span>
                  </Link>
                </li>
                : <div></div>}

            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
