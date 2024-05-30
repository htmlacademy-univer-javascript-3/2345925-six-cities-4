import { FC, FormEvent, useMemo, useState } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../state';
import { MAIN_URL } from '../../const/url';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../state/selectors';
import { AuthStatus } from '../../types/auth-status';
import { logIn } from '../../state/user/user-actions';
import { CITIES_DATA } from '../../const/cities';
import { changeCity } from '../../state/city/city-actions';

interface FormState {
  email: string;
  password: string;
}

const isValidPassword = (input: string): boolean => {
  const hasChar = /[a-zA-Z]/.test(input);
  const hasDigit = /\d/.test(input);
  return hasChar && hasDigit;
};

export const LoginPage: FC = () => {
  const [formData, setFormData] = useState<FormState>({email: '', password: ''});
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const navigate = useNavigate();
  const randomCityName = useMemo(() => CITIES_DATA[Math.floor(Math.random() * CITIES_DATA.length)], []);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if(!isValidPassword(formData.password)) {
      // eslint-disable-next-line no-alert
      alert('Password should have at least 1 digit and 1 character');
      return;
    }
    setFormDisabled(true);
    dispatch(logIn(formData)).then((value) => {
      if(value.payload === true) {
        navigate(MAIN_URL);
      } else {
        // eslint-disable-next-line no-alert
        alert('You wasn\'t logged in. Try again!');
      }
      setFormDisabled(false);
    });
  };
  if(authStatus === AuthStatus.Authorized) {
    return <Navigate to={MAIN_URL} />;
  }
  return (
    <div className="page page--gray page--login">
      <Header showSignButton={false}/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post"
              onSubmit={(event) => onSubmit(event)}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={(ev) => setFormData({...formData, email: ev.target.value})}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={(ev) => setFormData({...formData, password: ev.target.value})}
                />
              </div>
              <button className="login__submit form__submit button"
                type="submit"
                disabled={formDisabled}
              >
              Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={'/'} onClick={() => dispatch(changeCity(randomCityName))}>
                <span>{randomCityName.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>);
};
