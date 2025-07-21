import "./scss/dash-board.scss";
import UserAccountLayout from "../../layout-components/UserAccountLayout.jsx";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import useUserData from "../../stores-component/UsersData.jsx";
import { useRef } from "react";
import useQuizData from "../../stores-component/QuizDataStore.jsx";

function DashBoard() {
  const { userAccountData, userData } = useUserData();
  const { quizzesTaken } = userAccountData;
  const { allData } = useQuizData();
  const total = useRef(0);
  total.current = 0;
  function averageScore(array) {
    const length = array.length;
    array.forEach((item) => {
      total.current += Number(item.score);
    });
    return (total.current / length).toFixed(2);
  }
  return (
    <UserAccountLayout>
      <main>
        {console.log(userAccountData)}
        {userAccountData.quizzesTaken && (
          <div className="user-dashboard">
            <h1>Dashboard</h1>
            <h2>Welcome back, {userData.name}!</h2>
            <div className="quiz-overview">
              <section className="overview-card">
                <h3>Latest Quiz Score</h3>
                <p>
                  {quizzesTaken[0]
                    ? `${quizzesTaken[quizzesTaken.length - 1].score}%`
                    : "-"}
                </p>
              </section>
              <section className="overview-card">
                <h3>Total Quizzes Taken</h3>
                <p>{quizzesTaken[0] ? quizzesTaken.length : "-"}</p>
              </section>
              <section className="overview-card">
                <h3>Average Quiz Score</h3>
                <p>
                  {quizzesTaken[0] ? `${averageScore(quizzesTaken)}%` : "-"}
                </p>
              </section>
            </div>

            <section className="progress">
              <h3>Quizzes Quiz Completed</h3>
              <p>
                {quizzesTaken[0]
                  ? `${quizzesTaken.length}/${allData.length}`
                  : `0/${allData.length}`}
              </p>
              <div className="progress-bar-wrapper">
                <div className="progress-bar">
                  <CircularProgressbar
                    value={quizzesTaken[0] ? quizzesTaken.length : 0}
                    maxValue={allData.length}
                    text={""}
                    circleRatio={1}
                    strokeWidth={20}
                    styles={buildStyles({
                      pathColor: "rgb(0, 21, 90)",
                      trailColor: "rgb(167, 167, 167)",
                      rotation: 0,
                      textColor: "rgb(15, 15, 15)",
                      textSize: `${25 / 16}rem`,
                      pathTransitionDuration: 2,
                      strokeLinecap: "butt",
                    })}
                  />
                  <span>
                    {quizzesTaken[0]
                      ? `${parseInt(
                          (quizzesTaken.length / allData.length) * 100
                        )}%`
                      : "0%"}
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </UserAccountLayout>
  );
}

export default DashBoard;
