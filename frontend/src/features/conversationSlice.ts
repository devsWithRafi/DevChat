import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ConversationType, MessageType } from '../types/Types';

interface ConversationsStateType {
    conversations: ConversationType | null;
    loading: boolean;
    error: string | null;
}

const initialUsers: ConversationsStateType = {
    conversations: null,
    loading: false,
    error: null,
};

const conversationSlice = createSlice({
    name: 'conversations',
    initialState: initialUsers,
    reducers: {
        fetchConversationStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchConversationSuccess: (
            state,
            action: PayloadAction<ConversationType>,
        ) => {
            state.loading = false;
            state.conversations = action.payload;
        },
        fetchConversationError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addNewMessagesIntoConversation: (
            state,
            action: PayloadAction<MessageType>,
        ) => {
            if (!state.conversations) {
                state.conversations = {
                    id: action.payload.conversationId,
                    receiverId: action.payload.receiverId,
                    senderId: action.payload.senderId,
                    messages: [action.payload],
                };
            } 
            else {
                state.conversations.messages.push(action.payload);
            }
        },
        clearConversation: (state) => {
            state.conversations = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    fetchConversationStart,
    fetchConversationSuccess,
    fetchConversationError,
    clearConversation,
    addNewMessagesIntoConversation,
} = conversationSlice.actions;
export default conversationSlice.reducer;
