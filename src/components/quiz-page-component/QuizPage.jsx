import { useEffect, useRef, useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestions from "./QuizQuestions";
import QuizIntro from "./QuizIntro";
import Results from "../results/ResultPage";
import { toast, ToastContainer } from "react-toastify";
import useQuizData from "../stores-component/QuizDataStore";

function QuizPage({ index }) {
  const { allData } = useQuizData();
  const [showQuestions, setShowQuestions] = useState(false);
  useEffect(() => {
    console.log("effect");
    document.body.style.background = 'url("/PE.webp")';
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

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

  const startQuiz = () => {
    setShowQuestions(true);
  };

  async function submitQuiz() {
    try {
      const fetchedAns = await fetch(
        "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/all-answers.json"
      );
      // const fetchedAns = await fetch("/all-answers.json");
      const answersData = await fetchedAns.json();
      setCorrectAnswers(answersData[index].answers);
      // setCorrectAnswers(answersData);
      setSubmitted(true);
    } catch (err) {
      err.message.toLowerCase().includes("failed to fetch")
        ? toast.error("Network error, please check your internet connection")
        : toast.error("Server Error, please try again later");
    }
  }

  return (
    <>
      {submitted && correctAnswers.length>0 ? (
        <Results
          answersData={correctAnswers}
          userAnswers={userAnswers}
          questionsIndex={index}
          dataAtIndex={allData[index]}
        />
      ) : (
        <>
          {!showQuestions ? (
            <QuizIntro startQuizProp={startQuiz} questionsIndex={index} />
          ) : (
            <>
              <QuizHeader
                submitFunction={submitQuiz}
                quizLength={
                  allData[index].questions.length
                    ? allData[index].questions.length
                    : 0
                }
              />
              <QuizQuestions
                data={
                  allData[index].questions ? allData[index].questions : allData
                }
                userAnswers={userAnswers}
                submitFunction={submitQuiz}
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
