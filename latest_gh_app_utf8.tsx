import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { useEffect } from "react";
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
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-inter">
        <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
