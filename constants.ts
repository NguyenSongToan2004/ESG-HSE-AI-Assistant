
import { Language, TranslationStrings } from './types';

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  [Language.VIETNAMESE]: {
    home: 'Trang chủ',
    organization: 'Tổ chức',
    language: 'Ngôn ngữ',
    placeholder: 'Hỏi về ESG hoặc HSE...',
    assistantName: 'ESG/HSE AI Assistant',
    guest: 'Khách',
    newChat: 'Trò chuyện mới',
    settings: 'Cài đặt'
  },
  [Language.ENGLISH]: {
    home: 'Home',
    organization: 'Organization',
    language: 'Language',
    placeholder: 'Ask about ESG or HSE...',
    assistantName: 'ESG/HSE AI Assistant',
    guest: 'Guest',
    newChat: 'New Chat',
    settings: 'Settings'
  },
  [Language.ALBANIAN]: {
    home: 'Kreu',
    organization: 'Organizata',
    language: 'Gjuha',
    placeholder: 'Pyetni për ESG ose HSE...',
    assistantName: 'ESG/HSE AI Asistenti',
    guest: 'Mysafir',
    newChat: 'Bisedë e Re',
    settings: 'Cilësimet'
  }
};
