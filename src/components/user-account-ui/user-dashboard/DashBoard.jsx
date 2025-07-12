import "./scss/dash-board.scss";
import UserAccountLayout from '../../layout-components/UserAccountLayout.jsx'
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

function DashBoard() {
  return (
    <UserAccountLayout>
      <div className="user-dashboard">
        <h1>Dashboard</h1>
        <h2>Welcome back, Admin!</h2>
        <div className="quiz-overview">
          <section className="overview-card">
            <h3>Latest Quiz Score</h3>
            <p>73.45%</p>
          </section>
          <section className="overview-card">
            <h3>Total Quizzes Taken</h3>
            <p>13</p>
          </section>
          <section className="overview-card">
            <h3>Average Quiz Score</h3>
            <p>70.13%</p>
          </section>
        </div>

        <section className="progress">
          <h3>Quizzes Quiz Completed</h3>
          <p>13/25</p>
          <div className="progress-bar-wrapper">
            <div
              
              className="progress-bar"
            >
              <CircularProgressbar
                value={23}
                maxValue={25}
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
                55%
              </span>
            </div>
          </div>
        </section>
      </div>
    </UserAccountLayout>
  );
}

export default DashBoard;
