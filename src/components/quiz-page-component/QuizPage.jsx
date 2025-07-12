import { useEffect, useRef, useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestions from "./QuizQuestions";
import QuizIntro from "./QuizIntro";
import Results from "../results/ResultPage";
import { toast, ToastContainer } from "react-toastify";
import useQuizData from "../stores-component/QuizDataStore";

function QuizPage({ index }) {
  const { allData, fetchData, titlesFetch, allTitles } = useQuizData();
  useEffect(() => {
    console.log("effect");
    document.body.style.background = 'url("/PE.webp")';
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

    titlesFetch()

    return () => {
      // reset styles if needed
      document.body.style.background = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);

  // const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const userAnswers = useRef([]);

  // async function fetchQuestions() {
  //   try {
  //     const fetched = await fetch("https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/all-quiz-data.json");
  //     // const fetched = await fetch("/questions.json");
  //     const data = await fetched.json();
  //     console.log(data)
  //     setAllData(data);
  //     for (let i = 0; i < data.length; i++) {
  //       userAnswers.current[i] = "No Answer";
  //     }
  //   } catch (err) {
  //     err.message.toLowerCase().includes("failed to fetch")
  //       ? toast.error("Network error, please check your internet connection")
  //       : toast.error("Server Error, please try again later");
  //   }
  // }

  async function submitQuiz() {
    try {
      const fetchedAns = await fetch("https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/all-answers.json");
      // const fetchedAns = await fetch("/answers.json");
      const answersData = await fetchedAns.json();
      console.log(answersData);
      setCorrectAnswers(answersData[index].answers);
      setSubmitted(true);
    } catch (err) {
      err.message.toLowerCase().includes("failed to fetch")
        ? toast.error("Network error, please check your internet connection")
        : toast.error("Server Error, please try again later");
    }
  }

  return (
    <>
      {submitted ? (
        <Results answersData={correctAnswers} userAnswers={userAnswers} questionsIndex={index} />
      ) : (
        <>
          {!allData || allData.length === 0 ? (
            <QuizIntro
              fetchFunc={fetchData}
              name={allTitles[index]}
            />
          ) : (
            <>
              <QuizHeader
                submitFunction={submitQuiz}
                quizLength={allData[index].questions.length ? allData[index].questions.length : 0}
              />
              <QuizQuestions
                data={allData[index].questions ? allData[index].questions : allData}
                submitFunction={submitQuiz}
                userAns={userAnswers}
              />
            </>
          )}
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />
    </>
  );
}

export default QuizPage;
