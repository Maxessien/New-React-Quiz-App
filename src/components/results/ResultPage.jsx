import "./results.scss";
// import useQuizData from "./../stores-component/QuizDataStore";
import useUserData from "../stores-component/UsersData";
import { useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Results({ answersData, userAnswers, dataAtIndex }) {
  const { loggedIn, userAccountData, userData, quizzesTaken, setUserState } = useUserData();
  // const { allData } = useQuizData();
  const { course_code, questions } = dataAtIndex;
  const hasRun = useRef(false)
  let total = 0;
  for (let i = 0; i < answersData.length; i++) {
    if (userAnswers.current[i] === answersData[i]) {
      total++;
    }
  }
  useEffect(() => {
    if (loggedIn && !hasRun.current) {
      hasRun.current=true
      const date = new Date()
      const newAccountData = {
        user_id: userData.userId,
        course_code: course_code,
        score: ((total / answersData.length) * 100).toFixed(2),
        quiz_data: questions,
        selected_answers: userAnswers,
        correct_answers: answersData,
        time_stamp: date.toString(),
      };
      console.log(newAccountData.score, 'new')
      const updateBackend = async () => {
        try {
          // const res = await axios.post(
          //     "http://127.0.0.1:5000/update_results_db",
          //     newAccountData
          // )
            const res = await axios.post(
              "https://max-quiz-app-backend.onrender.com/update_results_db",
              newAccountData
            );
            console.log(res);
          setUserState("userAccountData", [...userAccountData, newAccountData])
          setUserState("quizzesTaken", [...quizzesTaken, course_code])
        } catch (error) {
          console.lod(error)
        }
        // );
      };
      updateBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  return (
    <>
      <section className="results-section">
        <h1>Results</h1>

        <ul>
          {answersData.map((answer, index) => {
            return answer === userAnswers.current[index] ? (
              <li key={`score-${index + 1}`}>
                {console.log("li top")}
                <span>{`${index + 1}.) `}</span>
                <span>
                  <span style={{ marginRight: `${15 / 16}rem` }}>
                    {questions[index].question.slice(3)}
                  </span>
                  Correct ✅ - {userAnswers.current[index]}
                </span>
              </li>
            ) : (
              <li key={`score-${index + 1}`}>
                <span>{`${index + 1}.) `}</span>
                <span>
                  <span style={{ marginRight: `${15 / 16}rem` }}>
                    {questions[index].question.slice(3)}
                  </span>
                  Wrong ❌ - {userAnswers.current[index]} (Correct Answer -{" "}
                  {answer})
                </span>
              </li>
            );
          })}
        </ul>

        <p>
          Total: {total}/{answersData.length}
        </p>
        <p>Score: {((total / answersData.length) * 100).toFixed(2)}%</p>
        {loggedIn ?
        (<Link to={`/${userData.userId.trim().toLowerCase()}/dashboard`}>
        <button className="return-to-dashboard">
          Return To Dashboard
        </button>
        </Link>) : (
          <Link to={`/`}>
        <button className="return-to-dashboard">
          Return To Home
        </button>
        </Link>
        )
        }
      </section>
    </>
  );
}

export default Results;
