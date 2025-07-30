import "./scss/dash-board.scss";
import UserAccountLayout from "../../layout-components/UserAccountLayout.jsx";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import useUserData from "../../stores-component/UsersData.jsx";
import { useRef } from "react";
// import useQuizData from "../../stores-component/QuizDataStore.jsx";

function DashBoard() {
  const { userAccountData, userData, quizzesTaken } = useUserData();
  // const { allData } = useQuizData();
  const total = useRef(0);
  total.current = 0;
  console.log(quizzesTaken, "twtw")
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
        {console.log(quizzesTaken)}
        {userAccountData && (
          <div className="user-dashboard">
            <h1>Dashboard</h1>
            <h2>Welcome back, {userData.name}!</h2>
            <div className="quiz-overview">
              <section className="overview-card">
                <h3>Latest Quiz Score</h3>
                <p>
                  {userAccountData.length > 0
                    ? `${userAccountData[userAccountData.length - 1].score}%`
                    : "-"}
                </p>
              </section>
              <section className="overview-card">
                <h3>Total Quizzes Taken</h3>
                <p>
                  {userAccountData.length > 0 ? userAccountData.length : "-"}
                </p>
              </section>
              <section className="overview-card">
                <h3>Average Quiz Score</h3>
                <p>
                  {userAccountData.length > 0
                    ? `${averageScore(userAccountData)}%`
                    : "-"}
                </p>
              </section>
            </div>

            <section className="progress">
              <h3>Weekly Quizzes Completed</h3>
              <p>
                {quizzesTaken.length > 0
                  ? quizzesTaken.length < 7 ? `${quizzesTaken.length}/7` : "7/7"
                  : `0/7`}
              </p>
              <div className="progress-bar-wrapper">
                <div className="progress-bar">
                  <CircularProgressbar
                    value={quizzesTaken.length > 0 ? quizzesTaken.length < 7 ? quizzesTaken.length : 7 : 0}
                    maxValue={7}
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
                    {userAccountData[0]
                      ? `${quizzesTaken.length > 0 ? quizzesTaken.length < 7 ? parseInt((quizzesTaken.length/7)*100) : 100 : 0}%`
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
