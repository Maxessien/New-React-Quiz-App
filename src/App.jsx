import HomePage from "./components/home-components/Home";
// import QuizPage from "./components/quiz-page-component/QuizPage";
import Register from "./components/Forms/register-component/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./components/Forms/login-components/LogInPage";
import SuccessPage from "./components/all-quiz-components/SuccessPage";
import Csc102Lecture1 from "./components/all-quiz-components/Csc102Lecture1";
import DashBoard from "./components/user-account-ui/user-dashboard/DashBoard";
import UserQuizTab from "./components/user-account-ui/UserQuizTab/UserQuizTab";

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
          <Route path="/admin/dashboard" element={<DashBoard />}></Route>
          <Route path='admin/quiz' element={<UserQuizTab />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

