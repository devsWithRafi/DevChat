import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/currentUserSlice';
import allUsersReducer from '../features/allUsersSlice';
import conversationReducer from '../features/conversationSlice';
import addOnlineUsersReducer from '../features/onlineUserSlice';
import groupReducer from '../features/groupSlice';

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        allUsers: allUsersReducer,
        conversations: conversationReducer,
        onlineUsers: addOnlineUsersReducer,
        groups: groupReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
