import { FC, FormEvent, useEffect, useState } from 'react';
import { StarInput } from '../../../components/StarInput';
import { axiosInstance } from '../../../api';
import { SEND_FORM } from '../../../const/apiConsts';

const starValues = [5, 4, 3, 2, 1];

interface FormData {
  rating: number;
  comment: string;
}

export interface CommentFormProps {
  offerId: string;
  afterFormSend: () => void;
}

export const CommentForm: FC<CommentFormProps> = ({ offerId, afterFormSend }) => {

  const [data, setData] = useState<FormData | null>(null);
  const [submitDisabled, setSumitDisabled] = useState(true);
  const MIN_REVIEW_SYMBOLS = 50;

  useEffect(() => {
    if(data !== null && data.rating !== null && data.comment?.length >= MIN_REVIEW_SYMBOLS) {
      setSumitDisabled(false);
    } else {
      setSumitDisabled(true);
    }
  }, [data]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const sendData = async () => {
      try {
        await axiosInstance.post<Comment>(`${SEND_FORM}/${offerId}`, data);
        afterFormSend();
      } catch (err) { /* empty */ }
    };
    sendData();
  };

  return (
    <form className="reviews__form form"
      onSubmit={onSubmit}
    >
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
        onChange={(event) => setData({...data, comment: event.target.value} as FormData)}
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
