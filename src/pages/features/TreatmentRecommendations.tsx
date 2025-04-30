import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Heart, BookOpen, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const TreatmentRecommendations = () => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({
    title: 'Treatment Recommendations',
    subtitle: 'Expert Solutions for Plant Health',
    description: 'Get personalized treatment recommendations based on AI analysis of your plant\'s condition.',
    expert: 'Expert Advice',
    expertDesc: 'Access to professional plant care recommendations',
    personalized: 'Personalized Solutions',
    personalizedDesc: 'Customized treatment plans for your specific plant',
    preventive: 'Preventive Care',
    preventiveDesc: 'Tips to prevent future disease outbreaks',
    features: 'Key Features',
    feature1: 'Detailed Treatment Plans',
    feature1Desc: 'Step-by-step instructions for plant recovery',
    feature2: 'Natural Remedies',
    feature2Desc: 'Eco-friendly solutions for plant care',
    feature3: 'Prevention Tips',
    feature3Desc: 'Guidelines to maintain plant health',
    back: 'Back to Home'
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          title: await translate('Treatment Recommendations'),
          subtitle: await translate('Expert Solutions for Plant Health'),
          description: await translate('Get personalized treatment recommendations based on AI analysis of your plant\'s condition.'),
          expert: await translate('Expert Advice'),
          expertDesc: await translate('Access to professional plant care recommendations'),
          personalized: await translate('Personalized Solutions'),
          personalizedDesc: await translate('Customized treatment plans for your specific plant'),
          preventive: await translate('Preventive Care'),
          preventiveDesc: await translate('Tips to prevent future disease outbreaks'),
          features: await translate('Key Features'),
          feature1: await translate('Detailed Treatment Plans'),
          feature1Desc: await translate('Step-by-step instructions for plant recovery'),
          feature2: await translate('Natural Remedies'),
          feature2Desc: await translate('Eco-friendly solutions for plant care'),
          feature3: await translate('Prevention Tips'),
          feature3Desc: await translate('Guidelines to maintain plant health'),
          back: await translate('Back to Home')
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateTexts();
  }, [translate, currentLanguage]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link 
        to="/home" 
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        {translatedTexts.back}
      </Link>

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
            <Heart className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.expert}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.expertDesc}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.personalized}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.personalizedDesc}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.preventive}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.preventiveDesc}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">{translatedTexts.features}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.feature1}</h3>
            <p className="text-gray-600">{translatedTexts.feature1Desc}</p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.feature2}</h3>
            <p className="text-gray-600">{translatedTexts.feature2Desc}</p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.feature3}</h3>
            <p className="text-gray-600">{translatedTexts.feature3Desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TreatmentRecommendations; 