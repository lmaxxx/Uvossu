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

export interface Chat {
  type: string
  cretedAt: number
  membersUid: string[]
  favoriteMembersUid: string []
  lastMessageTime: number
}

export enum ChatTypes {
  PrivateChat,
  GroupChat,
  FavoriteChat
}