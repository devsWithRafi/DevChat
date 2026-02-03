export interface UserType {
    id: string;
    name: string;
    bio: string;
    email: string;
    avater: string | null;
    avater_public_id: string | null;
    createdAt: string | Date;
}

export interface MessageType {
    conversationId: string;
    id: string;
    isSeen: boolean;
    receiverId: string;
    senderId: string;
    image: string | null;
    text: string | null;
    createdAt: string | Date;
}

export interface ConversationType {
    id: string;
    senderId?: string;
    receiverId?: string;
    messages: MessageType[];
    sender?: UserType;
    receiver?: UserType;
}
