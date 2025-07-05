import QuizPage from "../quiz-page-component/QuizPage";

function Csc102Lecture1() {
  const quizN = "CSC 112 Lecture 1 Quiz";
  const questions =
    "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/test.json";
  const answers =
    "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/answers.json";

  return (
    <>
      <QuizPage
        quizName={quizN}
        questionsUrl={questions}
        answersUrl={answers}
      />
    </>
  );
}


export default Csc102Lecture1