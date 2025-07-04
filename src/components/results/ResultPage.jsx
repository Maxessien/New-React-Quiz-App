import "./results.scss";

function Results({ answersData, userAnswers }) {
  let total = 0;
  for (let i = 0; i < answersData.length; i++) {
    if (userAnswers.current[i] === answersData[i]) {
      total++;
    }
  }
  return (
    <>
      <section className="results-section">
        <h1>Results</h1>

        <ul>
          {answersData.map((answer, index) => {
            return answer === userAnswers.current[index] ? (
              <li key={`score-${index+1}`}>
                {console.log("li top")}
                <span>{`${index + 1}.) `}</span>{" "}
                <span>Correct ✅ - {userAnswers.current[index]}</span>
              </li>
            ) : (
              <li key={`score-${index+1}`}>
                <span>{`${index + 1}.) `}</span>{" "}
                <span>
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
      </section>
    </>
  );
}

export default Results;
