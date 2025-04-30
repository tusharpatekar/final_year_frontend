import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane as Plant, Upload, ArrowRight, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { user } = useAuth();
  const { translate, currentLanguage } = useLanguage();
  
  const [translatedTexts, setTranslatedTexts] = useState({
    welcome: 'Welcome to PlantCare',
    greeting: 'Hello',
    description: 'Detect plant diseases quickly and accurately using advanced AI technology',
    uploadImage: 'Upload an image of your plant to get started',
    detectNow: 'Detect Disease Now',
    featuresTitle: 'Why use PlantCare?',
    feature1Title: 'Accurate Detection',
    feature1Desc: 'Our AI model can identify various plant diseases with high accuracy',
    feature1Details: 'Powered by advanced machine learning algorithms trained on thousands of plant images',
    feature2Title: 'Fast Results',
    feature2Desc: 'Get results within seconds of uploading your plant image',
    feature2Details: 'Real-time processing with instant disease identification and analysis',
    feature3Title: 'Treatment Recommendations',
    feature3Desc: 'Receive personalized recommendations to treat identified diseases',
    feature3Details: 'Customized treatment plans based on plant type, disease severity, and environmental factors'
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          welcome: await translate('Welcome to PlantCare'),
          greeting: await translate('Hello'),
          description: await translate('Detect plant diseases quickly and accurately using advanced AI technology'),
          uploadImage: await translate('Upload an image of your plant to get started'),
          detectNow: await translate('Detect Disease Now'),
          featuresTitle: await translate('Why use PlantCare?'),
          feature1Title: await translate('Accurate Detection'),
          feature1Desc: await translate('Our AI model can identify various plant diseases with high accuracy'),
          feature1Details: await translate('Powered by advanced machine learning algorithms trained on thousands of plant images'),
          feature2Title: await translate('Fast Results'),
          feature2Desc: await translate('Get results within seconds of uploading your plant image'),
          feature2Details: await translate('Real-time processing with instant disease identification and analysis'),
          feature3Title: await translate('Treatment Recommendations'),
          feature3Desc: await translate('Receive personalized recommendations to treat identified diseases'),
          feature3Details: await translate('Customized treatment plans based on plant type, disease severity, and environmental factors')
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateTexts();
  }, [translate, currentLanguage]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 mb-12 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{translatedTexts.welcome}</h1>
            <p className="text-xl mb-2">{translatedTexts.greeting}, {user?.name || user?.email}!</p>
            <p className="text-lg opacity-90 mb-8">{translatedTexts.description}</p>
            <p className="mb-6">{translatedTexts.uploadImage}</p>
            <Link 
              to="/detect" 
              className="inline-flex items-center bg-white text-green-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-50 hover:scale-105 transition-all duration-300"
            >
              {translatedTexts.detectNow}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="md:w-2/5 flex justify-center">
            <img 
              src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Healthy plant" 
              className="rounded-lg w-full max-w-md object-cover shadow-lg transform hover:scale-105 transition-transform duration-500"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">{translatedTexts.featuresTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all duration-300 relative group">
            <div className="bg-green-100 rounded-full p-3 inline-block mb-4">
              <Plant className="h-8 w-8 text-green-600" />
            </div>
            <div className="relative">
              <h3 className="text-xl font-semibold text-green-800 mb-2 inline-flex items-center">
                {translatedTexts.feature1Title}
                <Info className="ml-2 h-5 w-5 text-green-600 cursor-help" />
              </h3>
              <div className="absolute left-0 top-full mt-2 w-64 bg-white p-4 rounded-lg shadow-lg border border-green-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                <p className="text-sm text-gray-600">{translatedTexts.feature1Details}</p>
              </div>
            </div>
            <p className="text-gray-600">{translatedTexts.feature1Desc}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all duration-300 relative group">
            <div className="bg-green-100 rounded-full p-3 inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="relative">
              <h3 className="text-xl font-semibold text-green-800 mb-2 inline-flex items-center">
                {translatedTexts.feature2Title}
                <Info className="ml-2 h-5 w-5 text-green-600 cursor-help" />
              </h3>
              <div className="absolute left-0 top-full mt-2 w-64 bg-white p-4 rounded-lg shadow-lg border border-green-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                <p className="text-sm text-gray-600">{translatedTexts.feature2Details}</p>
              </div>
            </div>
            <p className="text-gray-600">{translatedTexts.feature2Desc}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all duration-300 relative group">
            <div className="bg-green-100 rounded-full p-3 inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </div>
            <div className="relative">
              <h3 className="text-xl font-semibold text-green-800 mb-2 inline-flex items-center">
                {translatedTexts.feature3Title}
                <Info className="ml-2 h-5 w-5 text-green-600 cursor-help" />
              </h3>
              <div className="absolute left-0 top-full mt-2 w-64 bg-white p-4 rounded-lg shadow-lg border border-green-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                <p className="text-sm text-gray-600">{translatedTexts.feature3Details}</p>
              </div>
            </div>
            <p className="text-gray-600">{translatedTexts.feature3Desc}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 p-8 rounded-xl text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-6">
            <Upload className="h-12 w-12 text-green-600 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-4">{translatedTexts.uploadImage}</h2>
          <Link
            to="/detect"
            className="inline-flex items-center bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300"
          >
            {translatedTexts.detectNow}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;