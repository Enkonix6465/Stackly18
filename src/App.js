import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home1 from "./Pages/Home1";
import Home2 from "./Pages/Home2";
import AboutUs from "./Pages/AboutUs";
import TestMotion from "./TestMotion";
import Services from './Pages/Services';
import Blog from "./Pages/Blog";
import ContactUs from "./Pages/ContactUs";
import Nutrition from "./Pages/Nutrition";
import Mindful from "./Pages/Mindful";
import Sleep from "./Pages/Sleep";
import Stress from "./Pages/Stress";
import Holistic from "./Pages/Holistic";
import Wellness from "./Pages/Wellness";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./Pages/Login";
import Article from "./Pages/Article";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { DarkModeProvider } from "./context/Darkmodecontect";

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {/* ScrollToTopButton should be rendered globally, not as a route */}
      <ScrollToTopButton />
      <main className="min-h-[calc(100vh-128px)]">
        <Routes>
          <Route path="/home1" element={<Home1 />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/test" element={<TestMotion />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/mindful" element={<Mindful />} />
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/stress" element={<Stress />} />
          <Route path="/holistic" element={<Holistic />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
}

export default App;