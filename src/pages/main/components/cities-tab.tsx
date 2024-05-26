import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { City } from '../../../types/offer';
import { selectCurrentCity } from '../../../state/selectors';
import React from 'react';
import { changeCity } from '../../../state/city/city-actions';

interface CitiesTabsProps {
  cities: City[];
}

const CitiesTabs: FC<CitiesTabsProps> = ({cities}) => {
  const activeCity = useSelector(selectCurrentCity);
  const dispatch = useDispatch();

  const handleCityClick = useCallback((city: City) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <li key={city.name} className="locations__item" onClick={() => handleCityClick(city)}>
                <Link className={classNames('locations__item-link tabs__item', city.name === activeCity.name && 'tabs__item--active')} to="#">
                  <span>{city.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
};

const MemoCitiesTabs = React.memo(CitiesTabs);

export default MemoCitiesTabs;
