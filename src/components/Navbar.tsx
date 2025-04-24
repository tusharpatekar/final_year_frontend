import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, Globe, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const { currentLanguage, setLanguage, translate } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
            <Link to="/" className="hover:text-green-200 transition-colors">
              Home
            </Link>
            <Link to="/detect" className="hover:text-green-200 transition-colors">
              Detect Disease
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
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:text-green-200 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link to="/" className="block py-2 hover:text-green-200 transition-colors">
              Home
            </Link>
            <Link to="/detect" className="block py-2 hover:text-green-200 transition-colors">
              Detect Disease
            </Link>
            
            {/* Language Options */}
            <div className="py-2">
              <div className="font-medium mb-2 flex items-center">
                <Globe size={18} className="mr-2" />
                <span>Language</span>
              </div>
              <div className="pl-6 space-y-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => setLanguage(language.code as 'en' | 'hi' | 'mr')}
                    className={`block w-full text-left ${
                      currentLanguage === language.code ? 'font-medium text-green-200' : 'hover:text-green-200'
                    }`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 py-2 hover:text-green-200 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;