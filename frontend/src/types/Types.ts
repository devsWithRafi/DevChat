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
    groupId?: string;
    createdAt: string | Date;
    sender?: UserType;
    receiver?: UserType;
}

export interface ConversationType {
    id: string;
    senderId?: string;
    receiverId?: string;
    messages: MessageType[];
    sender?: UserType;
    receiver?: UserType;
}

export interface GroupType {
    id: string;
    groupsAvater: string | null;
    groupsAvater_public_id: string | null;
    name: string;
    bio: string | null;
    createdAt: string | Date;
    groupAdminId: string;
    admin: UserType;
    members: UserType[];
    messages: MessageType[];
}
