import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, CheckCircle2, BarChart3, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AccurateDetection = () => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({
    title: 'Accurate Detection',
    subtitle: 'Advanced AI Technology for Plant Disease Detection',
    back: 'Back to Home',
    description: 'Our system uses state-of-the-art machine learning algorithms to accurately identify plant diseases with high precision.',
    accuracy: 'High Accuracy Rate',
    accuracyDesc: 'Our AI model achieves over 95% accuracy in disease detection',
    realTime: 'Real-time Analysis',
    realTimeDesc: 'Instant results with detailed disease information',
    comprehensive: 'Comprehensive Database',
    comprehensiveDesc: 'Access to a vast database of plant diseases and treatments',
    howItWorks: 'How It Works',
    step1: 'Image Upload',
    step1Desc: 'Upload a clear image of your plant',
    step2: 'AI Analysis',
    step2Desc: 'Our AI analyzes the image using advanced algorithms',
    step3: 'Detailed Report',
    step3Desc: 'Receive a comprehensive report with disease identification'
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          title: await translate('Accurate Detection'),
          subtitle: await translate('Advanced AI Technology for Plant Disease Detection'),
          back: await translate('Back to Home'),
          description: await translate('Our system uses state-of-the-art machine learning algorithms to accurately identify plant diseases with high precision.'),
          accuracy: await translate('High Accuracy Rate'),
          accuracyDesc: await translate('Our AI model achieves over 95% accuracy in disease detection'),
          realTime: await translate('Real-time Analysis'),
          realTimeDesc: await translate('Instant results with detailed disease information'),
          comprehensive: await translate('Comprehensive Database'),
          comprehensiveDesc: await translate('Access to a vast database of plant diseases and treatments'),
          howItWorks: await translate('How It Works'),
          step1: await translate('Image Upload'),
          step1Desc: await translate('Upload a clear image of your plant'),
          step2: await translate('AI Analysis'),
          step2Desc: await translate('Our AI analyzes the image using advanced algorithms'),
          step3: await translate('Detailed Report'),
          step3Desc: await translate('Receive a comprehensive report with disease identification')
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
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.accuracy}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.accuracyDesc}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.realTime}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.realTimeDesc}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-green-800">{translatedTexts.comprehensive}</h3>
          </div>
          <p className="text-gray-600">{translatedTexts.comprehensiveDesc}</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">{translatedTexts.howItWorks}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.step1}</h3>
            <p className="text-gray-600">{translatedTexts.step1Desc}</p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.step2}</h3>
            <p className="text-gray-600">{translatedTexts.step2Desc}</p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">{translatedTexts.step3}</h3>
            <p className="text-gray-600">{translatedTexts.step3Desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccurateDetection; 