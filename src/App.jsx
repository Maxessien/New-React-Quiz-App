import HomePage from "./components/home-components/Home";
// import QuizPage from "./components/quiz-page-component/QuizPage";
import Register from "./components/Forms/register-component/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./components/Forms/login-components/LogInPage";
import SuccessPage from "./components/all-quiz-components/SuccessPage";
import Csc102Lecture1 from "./components/all-quiz-components/Csc102Lecture1";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz/success" element={<SuccessPage />}></Route>
          <Route path="/quiz/csc-102-lecture-1" element={<Csc102Lecture1 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

