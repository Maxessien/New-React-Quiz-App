import useQuizData from "../stores-component/QuizDataStore"
import { Link } from "react-router-dom" 
import './scss/available-quiz-list.scss'


function AvailableQuizList(){
    const {allTitles, allIds} = useQuizData()
    return (
        <>
        <ul className="available-quiz-list">
            {allTitles.map((title, index)=>{
                return (
                    <li key={allIds[index]} className="quiz-link">
                        <Link to={`/quiz/${allIds[index]}`}>
                            {title}
                        </Link>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default AvailableQuizList