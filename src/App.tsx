import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import { useTheme } from "./hooks/useTheme";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ErrorPage } from "./pages/ErrorPage";
import Login from "./pages/Login";
import UserProfile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import OurCourses from "./pages/OurCourses";
import SignUp from "./pages/Signup";
import MentorDetail from "./components/MentorDetails";
import CertificatePage from "./pages/CertificatePage";
import PracticeWithBot from "./pages/PracticeWithBot";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import SQLCertificatePage from './pages/sql_certificate_purchage';

const App = () => {
  useTheme();
  return (
    <>
      <div className="overflow-x-hidden bg-[var(--brand-bg)] text-[var(--brand-text)] min-h-screen transition-colors duration-500">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/courses" element={<OurCourses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/mentor/:mentorSlug" element={<MentorDetail />} />
          <Route path="/practice-bot" element={<PracticeWithBot />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="/sql-certificate" element={<SQLCertificatePage />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
        <CookieConsent />
        
      </div>
    </>
  );
};

export default App;
