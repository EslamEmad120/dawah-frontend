import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import LessonDetail from "./pages/LessonDetail"; // 👈 ضيف دي
import Navbar from "./components/Nabbar";
import About from "./pages/About";
import QuestionsList from "./pages/QuestionsList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (<>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/lesson/:lessonId" element={<LessonDetail />} /> {/* 👈 ودي */}
        <Route path="/about" element={<About />} />
        <Route path="/lesson/:lessonId/questions" element={<QuestionsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
