import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '../types/Types';

interface AllUsersState {
    users: UserType[];
    loading: boolean;
    error: string | null;
}

const initialUsers: AllUsersState = {
    users: [],
    loading: false,
    error: null,
};

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState: initialUsers,
    reducers: {
        usersFetchStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        usersFetchSuccess: (state, action: PayloadAction<UserType[]>) => {
            state.loading = false;
            state.users = action.payload;
        },
        usersFetchError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
            state.loading = false;
            state.error = null;
        },
    },
});

export const { usersFetchStart, usersFetchSuccess, usersFetchError, clearUsers } =
    allUsersSlice.actions;
export default allUsersSlice.reducer;
