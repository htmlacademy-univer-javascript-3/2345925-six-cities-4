import { FC } from 'react';
import { Comment } from '../../../types/comment';
import { formatDateMonthYYYY, formatDateToYYYYMMDD } from '../../../utils/datetime';
import React from 'react';

export interface ReviewCardProps {
  review: Comment;
}

const CommentCard: FC<ReviewCardProps> = ({ review }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name"> {review.user.name} </span>
      {review.user.isPro === true ? <span className="offer__user-status">Pro</span> : <div></div>}
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${review.rating * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={formatDateToYYYYMMDD(review.date)}>
        {formatDateMonthYYYY(review.date)}
      </time>
    </div>
  </li>
);

const memoCommentCard = React.memo(CommentCard, (prev, next) => prev.review.id === next.review.id);

export default memoCommentCard;
