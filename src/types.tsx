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
  date: {
    year: number
    day: number
    month: number
  }
  time: {
    hour: number
    minute: number
  }
}

export interface Chat {
  name?: string
  photoUrl?: string
  type: number
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