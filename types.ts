
export enum Language {
  VIETNAMESE = 'vi',
  ENGLISH = 'en',
  ALBANIAN = 'sq'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface User {
  name: string;
  avatar?: string;
}

export interface TranslationStrings {
  home: string;
  organization: string;
  language: string;
  placeholder: string;
  assistantName: string;
  guest: string;
  newChat: string;
  settings: string;
}
