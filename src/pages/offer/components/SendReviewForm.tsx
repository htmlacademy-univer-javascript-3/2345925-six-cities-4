import { FC, useEffect, useState } from 'react';
import { StarInput } from './StarInput';

const starValues = [5, 4, 3, 2, 1];

interface FormData {
  rating: number;
  review: string;
}

export const SendReviewForm: FC = () => {

  const [data, setData] = useState<FormData | null>(null);
  const [submitDisabled, setSumitDisabled] = useState(true);
  const MIN_REVIEW_SYMBOLS = 50;

  useEffect(() => {
    if(data !== null && data.rating !== null && data.review?.length >= MIN_REVIEW_SYMBOLS) {
      setSumitDisabled(false);
    } else {
      setSumitDisabled(true);
    }
  }, [data]);


  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
            Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {starValues.map((star) => (
          <StarInput
            starValue={star}
            onChange={() => setData({...data, rating: star} as FormData)}
            key={star}
          />
        ))}
      </div>
      <textarea
        onChange={(event) => setData({...data, review: event.target.value} as FormData)}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_SYMBOLS} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={submitDisabled}
        >
                Submit
        </button>
      </div>
    </form>
  );
};
