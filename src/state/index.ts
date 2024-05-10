import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import { axiosInstance } from '../api';
import { AxiosInstance } from 'axios';
import { useDispatch } from 'react-redux';

export interface ThunkConfig {
    state: State;
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }

export const store = configureStore({reducer, middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: axiosInstance
    }
  })});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
