import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { ServicePage } from "./pages/ServicePage";
import { PracticeAreaPage } from "./pages/PracticeAreaPage";
import { TutorialPage } from "./pages/TutorialPage";
import { AuthorPage } from "./pages/AuthorPage";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SearchModal } from "./components/SearchModal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-inter">
        <Nav onSearchClick={() => setIsSearchOpen(true)} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/practice-areas/:id" element={<PracticeAreaPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tutorials/:id" element={<TutorialPage />} />
            <Route path="/author/:id" element={<AuthorPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </Router>
  );
}