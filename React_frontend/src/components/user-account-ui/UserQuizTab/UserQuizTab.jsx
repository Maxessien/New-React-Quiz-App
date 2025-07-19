import { FaFilter, FaSearch } from "react-icons/fa";
import UserAccountLayout from "../../layout-components/UserAccountLayout";
import { useState, useReducer, useEffect } from "react";
import "./scss/user-quiz-tab.scss";
import useQuizData from "../../stores-component/QuizDataStore";
import { Link } from "react-router-dom";
import AvailableQuizList from "../../layout-components/AvailableQuizList";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import useIsDarkMode from "../../stores-component/DarkLightThemeStore";
// import { useQuery } from "@tanstack/react-query";

function UserQuizTab() {
  const { allData } = useQuizData();
  const { isDarkMode } = useIsDarkMode();
  const [filterMenu, setFilterMenu] = useState(false);
  const courses = allData.map(({ course_code }) => {
    return course_code;
  });

  //setting the theme of this component dynamically
 

  const handleSelectedCourse = (state, action) => {
    if (action.type === "all") {
      return [...courses];
    } else if (!state.includes(action.type)) {
      return [...state, action.type];
    } else {
      return state.filter((st) => st !== action.type);
    }
  };

  //setting the selected categories to courses when it has been successfully fetched and preventing
  // infinite loop by making it run only when selected category is empty
  useEffect(() => {
    if (courses.length > 0 && selectedCategory.length < 1) {
      dispatch({ type: "all" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const [selectedCategory, dispatch] = useReducer(handleSelectedCourse, []);

  return (
    <UserAccountLayout>
      <main>
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
                style={{
                  background: filterMenu
                    ? isDarkMode
                      ? "var(--blue-border)"
                      : "rgba(106, 150, 156, 1)"
                    : "none",
                }}
                onClick={() => setFilterMenu(!filterMenu)}
              >
                <FaFilter /> Filter
              </button>
            </div>

            <AnimatePresence mode="wait">
              {filterMenu && (
                <motion.div
                  variants={{
                    hidden: {
                      scaleY: 0,
                      transformOrigin: "top",
                    },
                    visible: {
                      scaleY: 1,
                      transformOrigin: "top",
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{
                    duration: 0.5,
                  }}
                  className="filter-wrapper"
                >
                  <div className="category">
                    <h3>By course</h3>
                    <ul className="all-courses">
                      {allData.map(({ course_code }, index) => {
                        console.log(index, course_code);
                        return (
                          <li
                            style={{
                              background: selectedCategory.includes(course_code)
                                ? isDarkMode
                                  ? "var(--blue-border)"
                                  : "rgba(106, 150, 156, 1)"
                                : "none",
                            }}
                            key={index}
                            onClick={() => dispatch({ type: course_code })}
                          >
                            {course_code}
                          </li>
                        );
                      })}
                    </ul>
                    <button onClick={() => dispatch({ type: "all" })}>
                      Reset
                    </button>
                  </div>

                  <div className="completed-quiz-filter">
                    <input
                      type="radio"
                      id="attempted"
                      name="completed-filter"
                    />
                    <label htmlFor="attempted">Attempted</label>

                    <input
                      type="radio"
                      id="not-attempted"
                      name="completed-filter"
                    />
                    <label htmlFor="not-attempted">Not Attempted</label>
                    <input type="radio" id="all" name="completed-filter" />
                    <label htmlFor="all">All</label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {selectedCategory.length > 0 && (
            <>
              <section>
                <ul className="available-quiz-list">
                  {allData.map(({ title, id, course_code }) => {
                    return (
                      <>
                        {selectedCategory.includes(course_code) ? (
                          <Link style={{ width: "100%" }} to={`/quiz/${id}`}>
                            <li key={`${id}Item`} className="quiz-link">
                              {title}
                            </li>
                          </Link>
                        ) : null}
                      </>
                    );
                  })}
                </ul>
              </section>
            </>
          )}
        </section>
      </main>
    </UserAccountLayout>
  );
}

export default UserQuizTab;
