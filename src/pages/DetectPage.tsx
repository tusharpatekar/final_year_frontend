import { useState, useEffect } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DetectPage = () => {
  const { translate, currentLanguage } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    treatment: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [translatedTexts, setTranslatedTexts] = useState({
    title: 'Detect Plant Disease',
    uploadText: 'Upload a plant image to detect diseases',
    dragDrop: 'Drag & drop your image here, or click to select',
    supportedFormats: 'Supported formats: JPG, PNG',
    detectButton: 'Detect Disease',
    loading: 'Analyzing image...',
    error: 'An error occurred. Please try again.',
    disease: 'Disease',
    confidence: 'Confidence',
    treatment: 'Treatment',
    noImage: 'Please select an image first'
  });

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          title: await translate('Detect Plant Disease'),
          uploadText: await translate('Upload a plant image to detect diseases'),
          dragDrop: await translate('Drag & drop your image here, or click to select'),
          supportedFormats: await translate('Supported formats: JPG, PNG'),
          detectButton: await translate('Detect Disease'),
          loading: await translate('Analyzing image...'),
          error: await translate('An error occurred. Please try again.'),
          disease: await translate('Disease'),
          confidence: await translate('Confidence'),
          treatment: await translate('Treatment'),
          noImage: await translate('Please select an image first')
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateTexts();
  }, [translate, currentLanguage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDetect = async () => {
    if (!selectedImage) {
      setError(translatedTexts.noImage);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual API call to backend
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult({
        disease: 'Leaf Rust',
        confidence: 0.95,
        treatment: 'Apply fungicide and remove affected leaves'
      });
    } catch (err) {
      setError(translatedTexts.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-8">{translatedTexts.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{translatedTexts.uploadText}</h2>
          
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleImageChange}
            />
            
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">{translatedTexts.dragDrop}</p>
            <p className="text-sm text-gray-500">{translatedTexts.supportedFormats}</p>
          </div>
        </div>

        {previewUrl && (
          <div className="mb-6">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <button
          onClick={handleDetect}
          disabled={!selectedImage || isLoading}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              {translatedTexts.loading}
            </div>
          ) : (
            translatedTexts.detectButton
          )}
        </button>

        {result && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Detection Results</h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-700">{translatedTexts.disease}: </span>
                <span className="text-green-800">{result.disease}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">{translatedTexts.confidence}: </span>
                <span className="text-green-800">{(result.confidence * 100).toFixed(2)}%</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">{translatedTexts.treatment}: </span>
                <span className="text-green-800">{result.treatment}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectPage; 