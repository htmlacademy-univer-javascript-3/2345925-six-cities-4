import { FC } from 'react';
import { Review } from '../../../types/review';
import { ReviewCard } from './ReviewCard';

export interface ReviewListProps {
  reviews: Review[] | undefined;
}

export const ReviewList: FC<ReviewListProps> = ({reviews}) => {
  if(reviews === undefined || reviews.length === 0) {
    return <h2 className="reviews__title"> There is no comments yet. <br></br> Leave comment first!</h2>;
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((it) => <ReviewCard key={it.id} review={it} />)}
      </ul>
    </>
  );
};

