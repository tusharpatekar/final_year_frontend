import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = () => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({
    title: 'About PlantCare',
    description: 'PlantCare is an innovative platform that helps you identify and treat plant diseases using advanced AI technology.',
    mission: 'Our Mission',
    missionText: 'To make plant care accessible and effective for everyone, from home gardeners to professional farmers.',
    team: 'Our Team',
    teamText: 'A dedicated group of plant enthusiasts, AI experts, and developers working together to improve plant health worldwide.',
    contact: 'Contact Us',
    contactText: 'Have questions or suggestions? We\'d love to hear from you!'
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          title: await translate('About PlantCare'),
          description: await translate('PlantCare is an innovative platform that helps you identify and treat plant diseases using advanced AI technology.'),
          mission: await translate('Our Mission'),
          missionText: await translate('To make plant care accessible and effective for everyone, from home gardeners to professional farmers.'),
          team: await translate('Our Team'),
          teamText: await translate('A dedicated group of plant enthusiasts, AI experts, and developers working together to improve plant health worldwide.'),
          contact: await translate('Contact Us'),
          contactText: await translate('Have questions or suggestions? We\'d love to hear from you!')
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
      <h1 className="text-3xl font-bold text-green-800 mb-8">{translatedTexts.title}</h1>
      
      <div className="space-y-8">
        <section>
          <p className="text-lg text-gray-700">{translatedTexts.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">{translatedTexts.mission}</h2>
          <p className="text-gray-700">{translatedTexts.missionText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">{translatedTexts.team}</h2>
          <p className="text-gray-700">{translatedTexts.teamText}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">{translatedTexts.contact}</h2>
          <p className="text-gray-700">{translatedTexts.contactText}</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 