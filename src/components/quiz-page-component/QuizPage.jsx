import { useEffect, useRef, useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestions from "./QuizQuestions";
import QuizIntro from "./QuizIntro";
import Results from "../results/ResultPage";
import { toast, ToastContainer } from "react-toastify";

function QuizPage() {
  useEffect(() => {
  console.log('effect');
  document.body.style.background = 'url("/PE.webp")';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundAttachment = 'fixed';

  return () => {
    // reset styles if needed
    document.body.style.background = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundAttachment = '';
  };
}, []);

  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const userAnswers = useRef([]);

  async function fetchQuestions() {
    try {
      // const fetched = await fetch(
      // //   "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/test.json"
      // // );
      const fetched = await fetch("/questions.json");
      const data = await fetched.json();
      setQuestions(data);
      for (let i = 0; i < data.length; i++) {
        userAnswers.current[i] = "No Answer";
      }
    } catch (err) {
      err.message.toLowerCase().includes("failed to fetch")
        ? toast.error("Network error, please check your internet connection")
        : toast.error("Server Error, please try again later");
    }
  }

  async function submitQuiz() {
    try {
      const fetchedAns = await fetch(
        "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/answer.json"
      );
      // const fetchedAns = await fetch("/answers.json");
      const answersData = await fetchedAns.json();
      setCorrectAnswers(answersData);
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
        <Results answersData={correctAnswers} userAnswers={userAnswers} />
      ) : (
        <>
          {!questions || questions.length === 0 ? (
            <QuizIntro fetchFunc={fetchQuestions} />
          ) : (
            <div>
              <QuizHeader
                submitFunction={submitQuiz}
                quizLength={questions.length}
              />
              <QuizQuestions
                data={questions}
                submitFunction={submitQuiz}
                userAns={userAnswers}
              />
            </div>
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

