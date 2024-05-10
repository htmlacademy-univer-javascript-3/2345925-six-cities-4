import { FC } from 'react';

export interface StarInputProps {
    onChange: (num: number) => void;
    starValue: number;
    checkedValue: number | undefined;
}

export const StarInput: FC<StarInputProps> = ({ onChange, starValue, checkedValue }) => (
  <>
    <input
      onChange={() => onChange(starValue)}
      className="form__rating-input visually-hidden"
      name="rating"
      value={starValue}
      id={`${starValue}-stars`}
      type="radio"
      checked={starValue === checkedValue}
    />
    <label
      htmlFor={`${starValue}-stars`}
      className="reviews__rating-label form__rating-label"
      title="perfect"
    >
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
);
