import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../const/url';
import { useAppDispatch } from '../state';
import { changeFavouriteStatus } from '../state/actions';
import { selectAuthStatus } from '../state/selectors';
import { AuthStatus } from '../types/authStatus';
import { FavouriteStatus } from '../types/favouriteStatus';

const DEFAULT_STYLE_GROUP = 'place-card';
const FAVOURITE_BUTTON_CLASS = 'place-card__bookmark-button--active';
const DEFAULT_WIDTH = 18;
const DEFAULT_HEIGHT = 19;

export interface FavouriteButtonProps {
  isFavourite: boolean;
  id: string;
  stylePrefix?: string;
  width?: number;
  height?: number;
}

const FavouriteButton: FC<FavouriteButtonProps> = ({isFavourite, id, stylePrefix, width, height}) => {
  const dispatch = useAppDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const navigate = useNavigate();

  const onFavouriteClick = (isFavorite: boolean, offerId: string) => {

    if(authStatus === AuthStatus.NOT_AUTORIZED) {
      navigate(LOGIN_URL);
    }
    const newStatus = isFavorite ? FavouriteStatus.USUAL : FavouriteStatus.FAVOURITE;
    dispatch(changeFavouriteStatus({ offerId, newStatus }));
  };

  return (
    <button
      className={`${stylePrefix ? stylePrefix : DEFAULT_STYLE_GROUP}__bookmark-button button ${isFavourite ? FAVOURITE_BUTTON_CLASS : ''}`}
      type="button"
      onClick={() => onFavouriteClick(isFavourite, id)}
    >
      <svg className="place-card__bookmark-icon" width={width ? width : DEFAULT_WIDTH} height={height ? height : DEFAULT_HEIGHT}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
            To bookmarks
      </span>
    </button>
  );
};

export default FavouriteButton;
