import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

type Language = 'en' | 'hi' | 'mr';

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
};

const translations: Record<string, Record<Language, string>> = {
  'Login': {
    en: 'Login',
    hi: 'लॉग इन',
    mr: 'लॉगिन'
  },
  'Signup': {
    en: 'Signup',
    hi: 'साइन अप',
    mr: 'नोंदणी करा'
  },
  'Email': {
    en: 'Email',
    hi: 'ईमेल',
    mr: 'ईमेल'
  },
  'Password': {
    en: 'Password',
    hi: 'पासवर्ड',
    mr: 'पासवर्ड'
  },
  'Upload Image': {
    en: 'Upload Image',
    hi: 'छवि अपलोड करें',
    mr: 'प्रतिमा अपलोड करा'
  },
  'Detect Disease': {
    en: 'Detect Disease',
    hi: 'रोग का पता लगाएं',
    mr: 'रोग शोधा'
  },
  'Home': {
    en: 'Home',
    hi: 'होम',
    mr: 'मुख्यपृष्ठ'
  },
  'Logout': {
    en: 'Logout',
    hi: 'लॉग आउट',
    mr: 'बाहेर पडा'
  },
  'Welcome': {
    en: 'Welcome',
    hi: 'स्वागत है',
    mr: 'स्वागत आहे'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async (text: string): Promise<string> => {
    if (currentLanguage === 'en') return text;
    
    // Check if we have a cached translation
    if (translations[text] && translations[text][currentLanguage]) {
      return translations[text][currentLanguage];
    }
    
    setIsTranslating(true);
    
    try {
      const subscriptionKey = 'DE2DLHkrlEHK7Is6wQCUlWpNT6a3AXLr18AQLDeipaWwV4NzryPWJQQJ99BDACGhslBXJ3w3AAAbACOGh9Fl';
      const endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
      
      const response = await axios.post(
        `${endpoint}&to=${currentLanguage}`,
        [{ text }],
        {
          headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': 'centralindia',
            'Content-Type': 'application/json'
          }
        }
      );
      
      const translatedText = response.data[0].translations[0].text;
      
      // Cache the translation
      if (!translations[text]) {
        translations[text] = { en: text } as Record<Language, string>;
      }
      translations[text][currentLanguage] = translatedText;
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    } finally {
      setIsTranslating(false);
    }
  };

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const value = {
    currentLanguage,
    setLanguage,
    translate: translateText,
    isTranslating
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};