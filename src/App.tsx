// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectPage } from "./features/projects/ProjectPage";
import { ProjectDetail } from "./features/projects/ProjectDetail";
import { AboutPage } from "./pages/AboutPage";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { Header } from "./components/ui/Header";
import { WorkPage } from "./pages/WorkPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          {/* We can build these next */}
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
      </main>
    </Router>
  );
}

export default App;
