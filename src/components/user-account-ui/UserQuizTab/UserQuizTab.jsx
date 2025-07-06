import UserAccountLayout from "../UserAccountLayout";

function UserQuizTab(){
    return (
        <UserAccountLayout>
            <section className="user-quiz-section">
                <header>
                    <h1>QUIZ</h1>
                    <div className="filters">
                        <form>
                            <label htmlFor="search">
                                <input type="text" id="search" />
                                <FaSearch />
                            </label>
                        </form>
                    </div>
                </header>
            </section>
        </UserAccountLayout>
    )
}

export default UserQuizTab