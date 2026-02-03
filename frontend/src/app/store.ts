import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/currentUserSlice';
import allUsersReducer from '../features/allUsersSlice';
import conversationReducer from '../features/conversationSlice';
import addOnlineUsersReducer from '../features/onlineUserSlice';

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        allUsers: allUsersReducer,
        conversations: conversationReducer,
        onlineUsers: addOnlineUsersReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
