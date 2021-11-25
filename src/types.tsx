export interface User {
  photoURL: string,
  displayName: string,
  uid?: string,
  theme?: string
  email?: string | null
  uemail?: string | null
}

export enum AsideActions {
  Chats,
  Users,
  Favorites
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
  url?: string
  fileName?: string
  fileExtension?: string
}

export interface Chat {
  name?: string
  photoURL?: string
  cretedAt: number
  membersUid: string[]
  favoriteMembersUid: string []
  lastMessageTime: number
  lastMessage: Message
  isGroup: boolean
  id?: string
  ownerUid?: string
  avatarFile?: any
}

export enum ChatTypes {
  DefaultChat,
  FavoriteChat
}

export enum FormatDateType {
  Hour,
  FullDate
}

export enum MessageTypes {
  TEXT = "text",
  ALERT = "alert",
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file"
}

