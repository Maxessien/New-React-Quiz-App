import { FaFilter, FaSearch } from "react-icons/fa";
import UserAccountLayout from "../UserAccountLayout";
import { useEffect, useState } from "react";
import "./scss/user-quiz-tab.scss";

function UserQuizTab() {
  const [courses, setCourses] = useState([]);
  const [filterMenu, setFilterMenu] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      const fetchedData = await fetch("/courses.json");
      const data = await fetchedData.json();
      setCourses(data);
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    console.log(filteredCourses);
  }, [filteredCourses]);
  return (
    <UserAccountLayout>
      <section className="user-quiz-section">
        <header>
          <h1>QUIZ</h1>
          <div className="filters">
            <form>
              <label htmlFor="search" className="search-bar">
                <input type="text" id="search" placeholder="CSC 102" />
                <button type="submit">
                  <FaSearch size={20} />
                </button>
              </label>
            </form>

            <button
              className="filter-btn"
              onClick={() => setFilterMenu(!filterMenu)}
            >
              <FaFilter /> Filter
            </button>
          </div>

          {filterMenu && (
            <div className="filter-wrapper">
              <div className="category">
                <h3>By course</h3>
                <ul>
                  {courses.map((course, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() =>
                          !filteredCourses.includes(course)
                            ? setFilteredCourses([...filteredCourses, course])
                            : null
                        }
                      >
                        {course}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="completed-filter">
                <label htmlFor="attempted">
                  <input type="radio" id="attempted" name="completed-filter" />
                  Attempted
                </label>

                <label htmlFor="not-attempted">
                  <input
                    type="radio"
                    id="not-attempted"
                    name="completed-filter"
                  />
                  Not Attempted
                </label>
              </div>
            </div>
          )}
        </header>
      </section>
    </UserAccountLayout>
  );
}

export default UserQuizTab;
