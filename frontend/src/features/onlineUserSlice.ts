import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const onlineUserSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        addOnlineUsers: (state, action: PayloadAction<string[]>) => {
            return action.payload;
        },
    },
});

export const { addOnlineUsers } = onlineUserSlice.actions;

export default onlineUserSlice.reducer;
