import useQuizData from "../stores-component/QuizDataStore"
import { Link } from "react-router-dom" 
import './scss/available-quiz-list.scss'


function AvailableQuizList(){
    const {allData} = useQuizData()
    return (
        <>
        <ul className="available-quiz-list">
            {allData.map(({title, id}, index)=>{
                return (
                    <li key={id[index]} className="quiz-link">
                        <Link to={`/quiz/${id}`}>
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