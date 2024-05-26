import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../../types/auth-status';
import { User } from '../../types/user';
import { changeAuthStatus, changeUser } from './user-actions';
interface UserState {
  authStatus: AuthStatus;
  user: User | undefined;
}

const initialUserState: UserState = {
  authStatus: AuthStatus.NotAuthorized,
  user: undefined,
};

export const userReducer = createReducer(initialUserState, (builder) => {
  builder
    .addCase(changeAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(changeUser, (state, action) => {
      state.user = action.payload;
    });
});
