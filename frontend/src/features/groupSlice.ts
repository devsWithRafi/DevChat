import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GroupType } from '../types/Types';

interface initialGroupStateType {
    groups: GroupType[];
    grpLoading: boolean;
    error: string | null;
}

const initialGroup: initialGroupStateType = {
    groups: [],
    grpLoading: false,
    error: null,
};

const groupSlice = createSlice({
    name: 'groups',
    initialState: initialGroup,
    reducers: {
        groupFetchStart: (state) => {
            state.grpLoading = true;
            state.error = null;
        },
        groupFetchSuccess: (state, action: PayloadAction<GroupType[]>) => {
            state.grpLoading = false;
            state.groups = action.payload;
        },
        groupFetchError: (state, action: PayloadAction<string>) => {
            state.grpLoading = false;
            state.error = action.payload;
        },
        clearGroup: (state) => {
            state.groups = [];
            state.grpLoading = false;
            state.error = null;
        },
    },
});

export const {
    groupFetchStart,
    groupFetchSuccess,
    groupFetchError,
    clearGroup,
} = groupSlice.actions;
export default groupSlice.reducer;
