import HomePage from "./components/home-components/Home";
import QuizPage from "./components/quiz-page-component/QuizPage";
import Register from "./components/Forms/register-component/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./components/Forms/login-components/LogInPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Navigate to={'/quiz'} />} />
          <Route path="/login" element={<Navigate to={'/quiz'} />} />
          <Route path="/quiz" element={<QuizPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

