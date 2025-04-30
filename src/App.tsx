import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PublicLayout from './components/PublicLayout';
import PublicHeader from './components/PublicHeader';
import Layout from './components/Layout';
import PublicHomePage from './pages/PublicHomePage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import AccurateDetection from './pages/features/AccurateDetection';
import FastResults from './pages/features/FastResults';
import TreatmentRecommendations from './pages/features/TreatmentRecommendations';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/home" />;
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <PublicRoute>
                  <PublicLayout>
                    <PublicHomePage />
                  </PublicLayout>
                </PublicRoute>
              } />
              <Route path="/about" element={
                <PublicRoute>
                  <PublicLayout>
                    <AboutUsPage />
                  </PublicLayout>
                </PublicRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <PublicHeader />
                    <main className="flex-grow">
                      <LoginPage />
                    </main>
                  </div>
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <PublicHeader />
                    <main className="flex-grow">
                      <SignupPage />
                    </main>
                  </div>
                </PublicRoute>
              } />

              {/* Private Routes */}
              <Route path="/home" element={
                <PrivateRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/detect" element={
                <PrivateRoute>
                  <Layout>
                    <DiseaseDetectionPage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/features/accurate-detection" element={
                <PrivateRoute>
                  <Layout>
                    <AccurateDetection />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/features/fast-results" element={
                <PrivateRoute>
                  <Layout>
                    <FastResults />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/features/treatment-recommendations" element={
                <PrivateRoute>
                  <Layout>
                    <TreatmentRecommendations />
                  </Layout>
                </PrivateRoute>
              } />
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;