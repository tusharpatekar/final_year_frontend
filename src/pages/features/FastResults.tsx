import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Clock, Zap, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const FastResults = () => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({
    title: 'Fast Results',
    subtitle: 'Quick and efficient plant disease detection',
    back: 'Back to Home',
    description: 'Our system provides quick and efficient plant disease detection, saving you time and effort.',
    speed: 'Lightning Fast',
    speedDesc: 'Results in seconds, not hours or days',
    efficiency: 'Efficient Processing',
    efficiencyDesc: 'Optimized algorithms for quick analysis',
    productivity: 'Increased Productivity',
    productivityDesc: 'Save time and focus on treatment',
    benefits: 'Key Benefits',
    benefit1: 'Quick Diagnosis',
    benefit1Desc: 'Identify plant diseases within seconds',
    benefit2: 'Time Saving',
    benefit2Desc: 'No need to wait for lab results',
    benefit3: 'Immediate Action',
    benefit3Desc: 'Take prompt measures to treat diseases'
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          title: await translate('Fast Results'),
          subtitle: await translate('Quick and efficient plant disease detection'),
          back: await translate('Back to Home'),
          description: await translate('Our system provides quick and efficient plant disease detection, saving you time and effort.'),
          speed: await translate('Lightning Fast'),
          speedDesc: await translate('Results in seconds, not hours or days'),
          efficiency: await translate('Efficient Processing'),
          efficiencyDesc: await translate('Optimized algorithms for quick analysis'),
          productivity: await translate('Increased Productivity'),
          productivityDesc: await translate('Save time and focus on treatment'),
          benefits: await translate('Key Benefits'),
          benefit1: await translate('Quick Diagnosis'),
          benefit1Desc: await translate('Identify plant diseases within seconds'),
          benefit2: await translate('Time Saving'),
          benefit2Desc: await translate('No need to wait for lab results'),
          benefit3: await translate('Immediate Action'),
          benefit3Desc: await translate('Take prompt measures to treat diseases')
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateTexts();
  }, [translate, currentLanguage]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link 
        to="/home" 
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        {translatedTexts.back}
      </Link>
      
      <h1 className="text-3xl font-bold text-green-800 mb-2">{translatedTexts.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{translatedTexts.subtitle}</p>
      
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Leaf className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-green-800 mb-4">{translatedTexts.title}</h1>
        <p className="text-xl text-gray-600">{translatedTexts.subtitle}</p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Zap className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.speed}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.speedDesc}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Clock className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.efficiency}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.efficiencyDesc}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.productivity}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.productivityDesc}</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">{translatedTexts.benefits}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.benefit1}</h3>
            <p className="text-gray-600">{translatedTexts.benefit1Desc}</p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.benefit2}</h3>
            <p className="text-gray-600">{translatedTexts.benefit2Desc}</p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.benefit3}</h3>
            <p className="text-gray-600">{translatedTexts.benefit3Desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FastResults; 