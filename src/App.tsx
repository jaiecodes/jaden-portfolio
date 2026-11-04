// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./features/home/HomePage";
import { ProjectPage } from "./features/projects/ProjectPage";
import { CaseStudyPage } from "./features/case-study/CaseStudyPage";
import { AboutPage } from "./features/about/AboutPage";
import { ResumePage } from "./features/resume/ResumePage";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { Header } from "./components/ui/header/Header";

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectPage />} />
      {/* key remounts on project change, resetting scroll-driven animations */}
      <Route path="/project/:id" element={<CaseStudyPage key={location.pathname} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/resume" element={<ResumePage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;
