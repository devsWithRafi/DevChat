import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '../types/Types';

interface initialUserStateType {
    currentUser: UserType | null;
    loading: boolean;
    error: string | null;
}

const initialUser: initialUserStateType = {
    currentUser: null,
    loading: false,
    error: null,
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initialUser,
    reducers: {
        currUserFetchStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        currUserFetchSuccess: (state, action: PayloadAction<UserType>) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        currUserFetchError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    currUserFetchStart,
    currUserFetchSuccess,
    currUserFetchError,
    clearCurrentUser,
} = currentUserSlice.actions;
export default currentUserSlice.reducer;
