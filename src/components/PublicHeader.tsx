import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, translate } = useLanguage();
  const location = useLocation();

  const [translatedTexts, setTranslatedTexts] = useState({
    home: "Home",
    about: "About",
    login: "Login",
    signup: "Sign Up",
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          home: await translate("Home"),
          about: await translate("About"),
          login: await translate("Login"),
          signup: await translate("Sign Up"),
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    translateTexts();
  }, [translate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <span className="font-bold text-xl">PlantCare</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-green-200 transition-colors ${
                isActive("/") ? "text-green-200" : ""
              }`}
            >
              {translatedTexts.home}
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-green-200 transition-colors ${
                isActive("/about") ? "text-green-200" : ""
              }`}
            >
              {translatedTexts.about}
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 hover:text-green-200 transition-colors"
              >
                <Globe size={18} />
                <span>{languages.find(lang => lang.code === currentLanguage)?.name}</span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLanguage(language.code as 'en' | 'hi' | 'mr');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLanguage === language.code ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/login"
              className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
            >
              {translatedTexts.login}
            </Link>
            <Link
              to="/signup"
              className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
            >
              {translatedTexts.signup}
            </Link>
          </div>

          {/* Mobile Menu Items */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Selector for Mobile */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 hover:text-green-200 transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLanguage(language.code as 'en' | 'hi' | 'mr');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLanguage === language.code ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link 
              to="/" 
              className={`block py-2 hover:text-green-200 transition-colors ${
                isActive("/") ? "text-green-200" : ""
              }`}
            >
              {translatedTexts.home}
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 hover:text-green-200 transition-colors ${
                isActive("/about") ? "text-green-200" : ""
              }`}
            >
              {translatedTexts.about}
            </Link>
            <Link
              to="/login"
              className="block w-full text-center bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
            >
              {translatedTexts.login}
            </Link>
            <Link
              to="/signup"
              className="block w-full text-center bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
            >
              {translatedTexts.signup}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicHeader; 