import HomePage from "./components/home-components/Home";
import QuizPage from "./components/quiz-page-component/QuizPage";
import Register from "./components/Forms/register-component/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./components/Forms/login-components/LogInPage";
import SuccessPage from "./components/all-quiz-components/SuccessPage";
// import LoadQuestions from "./components/all-quiz-components/LoadQuestions";
import DashBoard from "./components/user-account-ui/user-dashboard/DashBoard";
import UserQuizTab from "./components/user-account-ui/UserQuizTab/UserQuizTab";
import useMobileView from "./components/stores-component/WindowWidthState";
import AvailableQuizList from "./components/layout-components/AvailableQuizList";
import useQuizData from "./components/stores-component/QuizDataStore";
import { useEffect } from "react";
import LoadAvailableQuiz from "./components/all-quiz-components/LoadAvailableQuiz";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
// import AvailableQuizzes from "./components/available-quizzes/AvailableQuizzes";

function App() {
  const { fetchData, allData } = useQuizData();
  const { mobileView, setMobileView } = useMobileView();
  useQuery({
    queryKey: ["quizData"],
    queryFn: fetchData,
    refetchOnReconnect: true,
  });
  useEffect(() => {
    const mobileCheck = () => {
      console.log(mobileView, "app");
      if (window.innerWidth < 768) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };
    window.addEventListener("resize", mobileCheck);
    mobileCheck();
    return () => window.removeEventListener("resize", mobileCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<LoadAvailableQuiz />} />
          <Route path="/quiz/success" element={<SuccessPage />} />
          {allData.map(({id}, i) => {
            return (
              <Route
                path={`/quiz/${id[i]}`}
                element={<QuizPage index={i} />}
              />
            );
          })}
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="admin/quiz" element={<UserQuizTab />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
