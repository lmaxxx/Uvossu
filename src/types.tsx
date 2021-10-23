export interface User {
  photoURL: string,
  displayName: string,
  uid?: string,
  theme?: string
  email?: string | null
  uemail?: string | null
}

export enum AsideActions {
  PrivateChats,
  GroupChats,
  FavoriteChats,
  SearchUsers
}

export interface Message {
  type: string
  value: any
  createdAt: number
  creatorUid: string
}

export interface Chat {
  name?: string
  photoUrl?: string
  type: string
  cretedAt: number
  membersUid: string[]
  favoriteMembersUid: string []
  lastMessageTime: number
  lastMessage: Message
  id?: string
}

export enum ChatTypes {
  PrivateChat,
  GroupChat,
  FavoriteChat
}