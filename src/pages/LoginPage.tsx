import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Leaf } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, googleLogin, isAuthenticated, isLoading } = useAuth();
  const { translate, currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const [translatedTexts, setTranslatedTexts] = useState({
    login: "Login",
    email: "Email",
    password: "Password",
    loginButton: "Login",
    googleButton: "Sign in with Google",
    noAccount: "Don't have an account?",
    signup: "Sign up",
  });

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/");
    }

    // Translate text based on current language
    const translateTexts = async () => {
      try {
        const translations = {
          login: await translate("Login"),
          email: await translate("Email"),
          password: await translate("Password"),
          loginButton: await translate("Login"),
          googleButton: await translate("Sign in with Google"),
          noAccount: await translate("Don't have an account?"),
          signup: await translate("Sign up"),
        };
        setTranslatedTexts(translations);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    translateTexts();

    // Add click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        navigate('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAuthenticated, navigate, translate, currentLanguage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log(await login(email, password));
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const tokenEndpoint = "https://oauth2.googleapis.com/token";
  
        const response = await fetch(tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: codeResponse.code,
            client_id: "763127770724-isjj3oae0bug2vk42ueo8090h4je9jpa.apps.googleusercontent.com",
            client_secret: "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", // ⚠️ Risky for frontend!
            redirect_uri: "https://salmon-pebble-0a7fc0b1e.6.azurestaticapps.net",   // Must match OAuth client setup
            grant_type: "authorization_code",
          }),
        });
  
        const tokenData = await response.json();
        console.log("Token exchange result:", tokenData);
  
        // Send ID token or access token to backend
        await googleLogin(tokenData.id_token); // OR access_token based on backend needs
  
        navigate("/");
      } catch (err) {
        console.error("Google login failed:", err);
        setError("Google login failed. Please try again.");
      }
    },
    onError: () => {
      setError("Google login failed. Please try again.");
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div ref={modalRef} className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mt-2">
            {translatedTexts.login}
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {translatedTexts.email}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {translatedTexts.password}
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {translatedTexts.loginButton}...
                </span>
              ) : (
                translatedTexts.loginButton
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {translatedTexts.googleButton}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleGoogleLogin()}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span>{translatedTexts.noAccount} </span>
          <Link
            to="/signup"
            className="font-medium text-green-600 hover:text-green-500"
          >
            {translatedTexts.signup}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
