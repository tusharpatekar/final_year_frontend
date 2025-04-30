import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "../contexts/LanguageContext";

type DetectionResult = {
  result: string;
};



const DiseaseDetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { translate, currentLanguage } = useLanguage();

  const [translatedTexts, setTranslatedTexts] = useState({
    title: "Plant Disease Detection",
    subtitle: "Upload a clear image of your plant to detect diseases",
    dropzoneText: "Drag & drop an image here, or click to select",
    uploadButton: "Analyze Image",
    loadingText: "Analyzing your image...",
    errorTitle: "Error",
    tryAgain: "Try Again",
    resultTitle: "Detection Result",
    uploadNew: "Upload New Image",
  });

  const [translatedResult, setTranslatedResult] =
    useState<DetectionResult | null>(null);

  useEffect(() => {
    const translateTexts = async () => {
      try {
        const translations = {
          title: await translate("Plant Disease Detection"),
          subtitle: await translate(
            "Upload a clear image of your plant to detect diseases"
          ),
          dropzoneText: await translate(
            "Drag & drop an image here, or click to select"
          ),
          uploadButton: await translate("Analyze Image"),
          loadingText: await translate("Analyzing your image..."),
          errorTitle: await translate("Error"),
          tryAgain: await translate("Try Again"),
          resultTitle: await translate("Detection Result"),
          uploadNew: await translate("Upload New Image"),
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    translateTexts();
  }, [translate, currentLanguage]);

  useEffect(() => {
    const translateResult = async () => {
      if (!result) {
        setTranslatedResult(null);
        return;
      }

      try {
        const translatedText = await translate(result.result);
        setTranslatedResult({
          result: translatedText,
        });
      } catch (error) {
        console.error("Error translating results:", error);
        setTranslatedResult(result);
      }
    };

    translateResult();
  }, [result, currentLanguage, translate]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedImage(file);

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    // Reset states
    setResult(null);
    setTranslatedResult(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedImage) return;
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/plantdisease",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(
        await translate("Failed to analyze the image. Please try again.")
      );
    } finally {
      setIsUploading(false);
    }
  };

  const resetStates = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setTranslatedResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">
        {translatedTexts.title}
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        {translatedTexts.subtitle}
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {!result && !isUploading && (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <p className="text-gray-600">{translatedTexts.dropzoneText}</p>
            </div>

            {imagePreview && (
              <div className="mt-6 text-center">
                <img
                  src={imagePreview}
                  alt="Plant preview"
                  className="max-h-64 mx-auto rounded-lg border border-gray-200"
                />
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300"
                >
                  {translatedTexts.uploadButton}
                </button>
              </div>
            )}
          </>
        )}

        {isUploading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 mx-auto text-green-500 animate-spin mb-4" />
            <p className="text-gray-600">{translatedTexts.loadingText}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              {translatedTexts.errorTitle}
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={resetStates}
              className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300"
            >
              {translatedTexts.tryAgain}
            </button>
          </div>
        )}

        {translatedResult && (
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {imagePreview && (
                <div className="md:w-1/3">
                  <img
                    src={imagePreview}
                    alt="Plant"
                    className="rounded-lg border border-gray-200 max-h-64 mx-auto"
                  />
                </div>
              )}

              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mr-2" />
                  <h3 className="text-2xl font-semibold text-green-800">
                    {translatedTexts.resultTitle}
                  </h3>
                </div>

                <div className="mb-4 p-4 bg-white rounded-lg shadow-sm prose prose-green max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold mb-4" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-bold mb-3" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-bold mb-2" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-4" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-6 mb-4" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-2" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-bold text-green-800"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {translatedResult.result}
                  </ReactMarkdown>
                </div>

                <button
                  onClick={resetStates}
                  className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300"
                >
                  {translatedTexts.uploadNew}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetectionPage;
