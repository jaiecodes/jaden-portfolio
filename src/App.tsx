// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ProjectPage } from "./features/projects/ProjectPage";
import { ProjectDetail } from "./features/projects/ProjectDetail";
import { AboutPage } from "./pages/AboutPage";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { Header } from "./components/ui/Header";
import { WorkPage } from "./pages/WorkPage";

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<ProjectPage />} />
      {/* key forces full remount on project change, resetting scroll-driven animations */}
      <Route path="/project/:id" element={<ProjectDetail key={location.pathname} />} />
      <Route
        path="/resume"
        element={
          <div className="bg-black h-screen pt-40 text-white px-10">
            Resume Page Coming Soon
          </div>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/work" element={<WorkPage />} />
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
