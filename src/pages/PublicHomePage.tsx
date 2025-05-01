import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Sprout, Clock, Shield, Zap, BarChart2, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PublicHomePage = () => {
  const { translate, currentLanguage } = useLanguage();
  
  const [translatedTexts, setTranslatedTexts] = useState({
    welcome: 'Welcome to PlantCare',
    tagline: 'Your Smart Plant Health Assistant',
    description: 'Detect plant diseases early and get expert recommendations for healthy crops',
    features: 'Key Features',
    earlyDetection: 'Early Disease Detection',
    earlyDetectionDesc: 'Identify plant diseases at their earliest stages using advanced AI technology',
    expertAdvice: 'Expert Recommendations',
    expertAdviceDesc: 'Get personalized treatment plans and care tips from agricultural experts',
    realTime: 'Real-time Monitoring',
    realTimeDesc: 'Monitor your plants\' health status in real-time with our mobile app',
    dataDriven: 'Data-Driven Insights',
    dataDrivenDesc: 'Access detailed analytics and reports to improve your farming practices',
    getStarted: 'Get Started',
    login: 'Login',
    signup: 'Sign Up',
    howItWorks: 'How It Works',
    step1: 'Upload Plant Image',
    step1Desc: 'Take a clear photo of your plant\'s affected area',
    step2: 'AI Analysis',
    step2Desc: 'Our AI analyzes the image to detect potential diseases',
    step3: 'Get Results',
    step3Desc: 'Receive instant diagnosis and treatment recommendations',
    benefits: 'Benefits',
    benefit1: 'Increase Crop Yield',
    benefit1Desc: 'Early detection leads to better treatment and higher yields',
    benefit2: 'Save Time & Money',
    benefit2Desc: 'Prevent crop loss and reduce unnecessary pesticide use',
    benefit3: 'Expert Support',
    benefit3Desc: 'Access to agricultural experts and best practices',
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          welcome: await translate('Welcome to PlantCare'),
          tagline: await translate('Your Smart Plant Health Assistant'),
          description: await translate('Detect plant diseases early and get expert recommendations for healthy crops'),
          features: await translate('Key Features'),
          earlyDetection: await translate('Early Disease Detection'),
          earlyDetectionDesc: await translate('Identify plant diseases at their earliest stages using advanced AI technology'),
          expertAdvice: await translate('Expert Recommendations'),
          expertAdviceDesc: await translate('Get personalized treatment plans and care tips from agricultural experts'),
          realTime: await translate('Real-time Monitoring'),
          realTimeDesc: await translate('Monitor your plants\' health status in real-time with our mobile app'),
          dataDriven: await translate('Data-Driven Insights'),
          dataDrivenDesc: await translate('Access detailed analytics and reports to improve your farming practices'),
          getStarted: await translate('Get Started'),
          login: await translate('Login'),
          signup: await translate('Sign Up'),
          howItWorks: await translate('How It Works'),
          step1: await translate('Upload Plant Image'),
          step1Desc: await translate('Take a clear photo of your plant\'s affected area'),
          step2: await translate('AI Analysis'),
          step2Desc: await translate('Our AI analyzes the image to detect potential diseases'),
          step3: await translate('Get Results'),
          step3Desc: await translate('Receive instant diagnosis and treatment recommendations'),
          benefits: await translate('Benefits'),
          benefit1: await translate('Increase Crop Yield'),
          benefit1Desc: await translate('Early detection leads to better treatment and higher yields'),
          benefit2: await translate('Save Time & Money'),
          benefit2Desc: await translate('Prevent crop loss and reduce unnecessary pesticide use'),
          benefit3: await translate('Expert Support'),
          benefit3Desc: await translate('Access to agricultural experts and best practices'),
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateTexts();
  }, [translate, currentLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-800 mb-6">
              {translatedTexts.welcome}
            </h1>
            <p className="text-xl sm:text-2xl text-green-700 mb-8">
              {translatedTexts.tagline}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              {translatedTexts.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                {translatedTexts.login}
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-medium"
              >
                {translatedTexts.signup}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            {translatedTexts.features}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-green-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-green-800 mb-2">
                {translatedTexts.earlyDetection}
              </h3>
              <p className="text-gray-600 text-center">
                {translatedTexts.earlyDetectionDesc}
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-green-800 mb-2">
                {translatedTexts.expertAdvice}
              </h3>
              <p className="text-gray-600 text-center">
                {translatedTexts.expertAdviceDesc}
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-green-800 mb-2">
                {translatedTexts.realTime}
              </h3>
              <p className="text-gray-600 text-center">
                {translatedTexts.realTimeDesc}
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <BarChart2 className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-green-800 mb-2">
                {translatedTexts.dataDriven}
              </h3>
              <p className="text-gray-600 text-center">
                {translatedTexts.dataDrivenDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            {translatedTexts.howItWorks}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Smartphone className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {translatedTexts.step1}
              </h3>
              <p className="text-gray-600">{translatedTexts.step1Desc}</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {translatedTexts.step2}
              </h3>
              <p className="text-gray-600">{translatedTexts.step2Desc}</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {translatedTexts.step3}
              </h3>
              <p className="text-gray-600">{translatedTexts.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            {translatedTexts.benefits}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {translatedTexts.benefit1}
              </h3>
              <p className="text-gray-600">{translatedTexts.benefit1Desc}</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {translatedTexts.benefit2}
              </h3>
              <p className="text-gray-600">{translatedTexts.benefit2Desc}</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {translatedTexts.benefit3}
              </h3>
              <p className="text-gray-600">{translatedTexts.benefit3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHomePage; 