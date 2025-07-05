import QuizPage from "../quiz-page-component/QuizPage";

function SuccessPage() {
  const quizN = "Success English Test";
  const questions =
    "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/success.json";
  const answers =
    "https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/successanswers.json";

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

export default SuccessPage
