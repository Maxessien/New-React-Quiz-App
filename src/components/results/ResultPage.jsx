import "./results.scss";
// import useQuizData from "./../stores-component/QuizDataStore";
import useUserData from "../stores-component/UsersData";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import PopUpModal from "../layout-components/PopUpModal";
import { RxCross1 } from "react-icons/rx";

function Results({ answersData, userAnswers, dataAtIndex }) {
  const { loggedIn, userAccountData, userData, quizzesTaken, setUserState } =
    useUserData();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()
  // const { allData } = useQuizData();
  const { course_code, questions } = dataAtIndex;
  const hasRun = useRef(false);
  let total = 0;
  for (let i = 0; i < answersData.length; i++) {
    if (userAnswers.current[i] === answersData[i]) {
      total++;
    }
  }
  useEffect(() => {
    if (loggedIn && !hasRun.current) {
      hasRun.current = true;
      const date = new Date();
      const newAccountData = {
        user_id: userData.userId,
        course_code: course_code,
        score: ((total / answersData.length) * 100).toFixed(2),
        quiz_data: questions,
        selected_answers: userAnswers,
        correct_answers: answersData,
        time_stamp: date.toString(),
      };
      console.log(newAccountData.score, "new");
      const updateBackend = async () => {
        try {
          // const res = await axios.post(
          //   "http://127.0.0.1:5000/update_results_db",
          //   newAccountData
          // );
          const res = await axios.post(
            "https://max-quiz-app-backend.onrender.com/update_results_db",
            newAccountData
          );
          console.log(res);
          setUserState("userAccountData", [...userAccountData, newAccountData]);
          setUserState("quizzesTaken", [...quizzesTaken, course_code]);
        } catch (error) {
          console.log(error);
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
        <div className="result_displays">
          <div className="result_displays_container">
            <h2>SCORE</h2>
            <div className="quiz_score">
              <CircularProgressbar
                value={((total / answersData.length) * 100).toFixed(2)}
                maxValue={100}
                strokeWidth={8}
                circleRatio={1}
                styles={buildStyles({
                  pathColor:
                    Math.round((total / answersData.length) * 100) > 60
                      ? "rgba(14, 124, 0, 1)"
                      : "rgba(207, 195, 25, 1)",
                  trailColor: "rgba(109, 109, 109, 1)",
                })}
              />
              <span className="score_text">
                {Math.round((total / answersData.length) * 100)}%
              </span>
              {/* <span className="score_text">99.99%</span> */}
            </div>
          </div>
          <div className="result_displays_container">
            <h2>TOTAL</h2>
            <div className="quiz_score">
              <CircularProgressbar
                value={((total / answersData.length) * 100).toFixed(2)}
                maxValue={100}
                strokeWidth={8}
                circleRatio={1}
                styles={buildStyles({
                  pathColor:
                    Math.round((total / answersData.length) * 100) > 60
                      ? "rgba(14, 124, 0, 1)"
                      : "rgba(207, 195, 25, 1)",
                  trailColor: "rgba(109, 109, 109, 1)",
                })}
              />
              <span className="score_text">
                {`${total}/${answersData.length}`}
              </span>
              {/* <span className="score_text">99.99%</span> */}
            </div>
          </div>
        </div>
        <div className="cta_buttons">
          {loggedIn ? (
            <Link to={`/${userData.userId.trim().toLowerCase()}/dashboard`}>
              <button className="return-cta">Return To Dashboard</button>
            </Link>
          ) : (
            <>
              <Link to={`/`}>
                <button className="return-cta">Return To Home</button>
              </Link>
              <button
                onClick={() => setShowPopup(true)}
                className="save-results"
              >
                Save Result
              </button>
            </>
          )}
        </div>
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
        {showPopup && (
          <PopUpModal>
            <div className="sign_up_cta">
              <button onClick={()=>setShowPopup(false)} className="close_icon">
                <RxCross1 />
              </button>
              <h2>Sign Up / Login</h2>
                <p>Save results for future reference</p>
                <p>Access saved scores anytime</p>
                <p>Track your learning over time</p>
                <p>Compete with friends (coming soon)</p>
                <div className="sign_up_cta_buttons">
                  <button onClick={()=>navigate("/register")}>Sign Up</button>
                  <button onClick={()=>navigate("/login")}>login</button>
                </div>
            </div>
          </PopUpModal>
        )}
      </section>
    </>
  );
}

export default Results;
