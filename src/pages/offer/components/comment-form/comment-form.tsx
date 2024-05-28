import { FC, FormEvent, useEffect, useState } from 'react';
import StarInput from '../../../../components/star-input/star-input';
import { axiosInstance } from '../../../../api';
import { SEND_FORM } from '../../../../const/api-const';

const starValues = [5, 4, 3, 2, 1];
const MIN_REVIEW_SYMBOLS = 50;
const MAX_REVIEW_SYMBOLS = 300;

interface FormData {
  rating: number | undefined;
  comment: string;
}

export interface CommentFormProps {
  offerId: string;
  handleFormSend: () => void;
}

const CommentForm: FC<CommentFormProps> = ({ offerId, handleFormSend }) => {

  const [data, setData] = useState<FormData>({rating: undefined, comment: ''});
  const [submitDisabled, setSumitDisabled] = useState(true);

  useEffect(() => {
    if(data.rating !== undefined && data.comment !== undefined
      && (data.comment.length >= MIN_REVIEW_SYMBOLS && data.comment.length <= MAX_REVIEW_SYMBOLS)) {
      setSumitDisabled(false);
    } else {
      setSumitDisabled(true);
    }
  }, [data]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const sendData = async () => {
      try {
        setSumitDisabled(true);
        await axiosInstance.post<Comment>(`${SEND_FORM}/${offerId}`, data);
        setData({rating: undefined, comment: ''});
        handleFormSend();
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert('Something went wrong, your comment wasn\'t saved');
      } finally {
        setSumitDisabled(false);
      }
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
            checked={data.rating === star}
          />
        ))}
      </div>
      <textarea
        value={data.comment}
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

export default CommentForm;
