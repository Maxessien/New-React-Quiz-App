import HomePage from "./components/home-components/Home";
import QuizPage from "./components/quiz-page-component/QuizPage";
import Register from "./components/Forms/register-component/Register";
import { Navigate, Route, Routes, useNavigate, Outlet } from "react-router-dom";
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
// import { ToastContainer } from "react-toastify";
import UserSettings from "./components/user-account-ui/user-settings/UserSettings";
import useDarkMode from "./components/stores-component/DarkLightThemeStore";
import UserProfile from "./components/user-account-ui/UserProfile/UserProfile";
import useUserData from "./components/stores-component/UsersData";
import axios from "axios";
// import AvailableQuizzes from "./components/available-quizzes/AvailableQuizzes";

function PublicRoute() {
  const { loggedIn, userData } = useUserData();
  if (loggedIn) {
    return (
      <Navigate
        to={`/${userData.userId.trim().toLowerCase()}/dashboard`}
        replace
      />
    );
  } else {
    return <Outlet />;
  }
}


function App() {
  const { fetchData, allData } = useQuizData();
  const { mobileView, setMobileView } = useMobileView();
  const { setIsDarkMode } = useDarkMode();
  const { userData, loggedIn, setUserState, fetchUserAccountData } =
    useUserData();
  const navigate = useNavigate();
  useQuery({
    queryKey: ["quizData"],
    queryFn: fetchData,
    refetchOnReconnect: true,
  });
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("session"));
    console.log(session);
    const loginSessionedUser = async (token) => {
      if (token) {
        try {
          // const response = await axios.get(
          //   `http://127.0.0.1:5000/login_with_token/${token}`
          // );
          const response = await axios.get(`https://max-quiz-app-backend.onrender.com/login_with_token/${token}`);
          setUserState("userData", response.data);
          setUserState("loggedIn", true);
          await fetchUserAccountData(response.data);
        } catch (error) {
          sessionStorage.clear();
          navigate("/login");
          console.log(error);
        }
      } else {
        return;
      }
    };
    loginSessionedUser(session);
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
    setIsDarkMode("system");
    return () => window.removeEventListener("resize", mobileCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<LoadAvailableQuiz />} />
          <Route path="/quiz/success" element={<SuccessPage />} />
        </Route>
        {allData.map(({ id }, i) => {
          return (
            <Route path={`/quiz/${id}`} element={<QuizPage index={i} />} />
          );
        })}
        {loggedIn && (
          <>
            <Route
              path={`/${userData.userId.trim().toLowerCase()}/dashboard`}
              element={<DashBoard />}
            />
            <Route
              path={`/${userData.userId.trim().toLowerCase()}/quiz`}
              element={<UserQuizTab />}
            />
            <Route
              path={`/${userData.userId.trim().toLowerCase()}/settings`}
              element={<UserSettings />}
            />
            <Route
              path={`/${userData.userId.trim().toLowerCase()}/profile`}
              element={<UserProfile />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
