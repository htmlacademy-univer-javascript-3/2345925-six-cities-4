import { FC } from 'react';
import { Comment } from '../../../types/comment';
import { CommentCard } from './CommentCard';

export interface CommentsListProps {
  reviews: Comment[] | undefined;
}

export const CommentsList: FC<CommentsListProps> = ({reviews}) => {
  if(reviews === undefined || reviews.length === 0) {
    return <h2 className="reviews__title"> There is no comments yet. <br></br> Leave comment first!</h2>;
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((it) => <CommentCard key={it.id} review={it} />)}
      </ul>
    </>
  );
};

