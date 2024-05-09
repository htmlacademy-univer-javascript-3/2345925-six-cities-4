import { FC, useEffect, useState } from 'react';

export enum SortType {
    LOW_PRICE_FIRST = 'Price: low to high',
    HIGH_PRICE_FIRST = 'Price: high to low',
    POPULAR = 'Popular',
    TOP_RATED_FIRST = 'Top rated first'
}

export interface SortingSelectProps {
    onSortSelected: (sortType: SortType) => void;
}

const SortingSelect: FC<SortingSelectProps> = ({ onSortSelected }) => {

  const [sortType, setSortType] = useState<SortType>(SortType.POPULAR);
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    onSortSelected(sortType);
  }, [sortType]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpenForm(!openForm)}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {
        openForm === true ?
          <ul className="places__options places__options--custom places__options--opened">
            {
              Object.values(SortType).map((key) =>
                (
                  <li className="places__option"
                    tabIndex={0} key={key}
                    onClick={() => {
                      setSortType(key);
                      setOpenForm(false);
                    }}
                  >
                    {key}
                  </li>)
              )
            }
          </ul>
          : <div></div>
      }
    </form>
  );
};

export default SortingSelect;
