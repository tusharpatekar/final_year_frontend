import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Leaf, Users, Target, Heart, Globe, Shield } from "lucide-react";

const AboutUsPage = () => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({
    aboutUs: "About Us",
    mission: "Our Mission",
    missionDesc: "To empower farmers with AI-powered tools for early detection and prevention of plant diseases, ensuring sustainable agriculture and food security.",
    vision: "Our Vision",
    visionDesc: "A world where every farmer has access to advanced technology for protecting their crops and maximizing yields.",
    story: "Our Story",
    storyDesc: "Founded by a team of agricultural experts and AI specialists, PlantCare emerged from the need to address the growing challenges in modern agriculture. We combine cutting-edge technology with agricultural expertise to create solutions that make a real difference.",
    values: "Our Values",
    innovation: "Innovation",
    innovationDesc: "Continuously developing new solutions to address agricultural challenges",
    sustainability: "Sustainability",
    sustainabilityDesc: "Promoting eco-friendly farming practices and reducing chemical usage",
    empowerment: "Empowerment",
    empowermentDesc: "Equipping farmers with knowledge and tools for better decision-making",
    team: "Our Team",
    teamDesc: "A diverse group of experts in agriculture, AI, and technology working together to revolutionize farming practices.",
    impact: "Our Impact",
    impactDesc: "Helping thousands of farmers improve crop health and increase yields through early disease detection and expert recommendations.",
    joinUs: "Join Us",
    joinUsDesc: "Be part of our mission to transform agriculture through technology. Together, we can build a more sustainable future.",
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          aboutUs: await translate("About Us"),
          mission: await translate("Our Mission"),
          missionDesc: await translate("To empower farmers with AI-powered tools for early detection and prevention of plant diseases, ensuring sustainable agriculture and food security."),
          vision: await translate("Our Vision"),
          visionDesc: await translate("A world where every farmer has access to advanced technology for protecting their crops and maximizing yields."),
          story: await translate("Our Story"),
          storyDesc: await translate("Founded by a team of agricultural experts and AI specialists, PlantCare emerged from the need to address the growing challenges in modern agriculture. We combine cutting-edge technology with agricultural expertise to create solutions that make a real difference."),
          values: await translate("Our Values"),
          innovation: await translate("Innovation"),
          innovationDesc: await translate("Continuously developing new solutions to address agricultural challenges"),
          sustainability: await translate("Sustainability"),
          sustainabilityDesc: await translate("Promoting eco-friendly farming practices and reducing chemical usage"),
          empowerment: await translate("Empowerment"),
          empowermentDesc: await translate("Equipping farmers with knowledge and tools for better decision-making"),
          team: await translate("Our Team"),
          teamDesc: await translate("A diverse group of experts in agriculture, AI, and technology working together to revolutionize farming practices."),
          impact: await translate("Our Impact"),
          impactDesc: await translate("Helping thousands of farmers improve crop health and increase yields through early disease detection and expert recommendations."),
          joinUs: await translate("Join Us"),
          joinUsDesc: await translate("Be part of our mission to transform agriculture through technology. Together, we can build a more sustainable future."),
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error("Translation error:", error);
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
              {translatedTexts.aboutUs}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {translatedTexts.missionDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Target className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
              {translatedTexts.mission}
            </h2>
            <p className="text-gray-600 text-center">
              {translatedTexts.missionDesc}
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Globe className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
              {translatedTexts.vision}
            </h2>
            <p className="text-gray-600 text-center">
              {translatedTexts.visionDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              {translatedTexts.story}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {translatedTexts.storyDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            {translatedTexts.values}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-green-800 mb-2">
                {translatedTexts.innovation}
              </h3>
              <p className="text-gray-600 text-center">
                {translatedTexts.innovationDesc}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-green-800 mb-2">
                {translatedTexts.sustainability}
              </h3>
              <p className="text-gray-600 text-center">
                {translatedTexts.sustainabilityDesc}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-green-800 mb-2">
                {translatedTexts.empowerment}
              </h3>
              <p className="text-gray-600 text-center">
                {translatedTexts.empowermentDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Users className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
              {translatedTexts.team}
            </h2>
            <p className="text-gray-600 text-center">
              {translatedTexts.teamDesc}
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Target className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
              {translatedTexts.impact}
            </h2>
            <p className="text-gray-600 text-center">
              {translatedTexts.impactDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            {translatedTexts.joinUs}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            {translatedTexts.joinUsDesc}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage; 