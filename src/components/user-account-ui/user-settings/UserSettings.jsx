import { FaPen, FaSlidersH, FaUser } from "react-icons/fa";
import UserAccountLayout from "../../layout-components/UserAccountLayout";
import "./scss/user-settings.scss";
import useDarkMode from "../../stores-component/DarkLightThemeStore";
import { useNavigate } from "react-router-dom";
import useUserData from "../../stores-component/UsersData";

function UserSettings() {
  const { isDarkMode, setIsDarkMode, selectedTheme } = useDarkMode();
  const { userData, logOut } = useUserData();
  const navigate = useNavigate();
  const handleSelectedTheme = (e) => {
    const theme = e.target.value;

    setIsDarkMode(theme);
  };

  const handleLogout = () => {
    navigate("/login");
    logOut();
    setIsDarkMode("system");
  };

  return (
    <>
      <UserAccountLayout>
        <main className="user-settings-main">
          <h1>Settings</h1>
          <section className="profile-settings">
            <h2>
              <span>
                <FaUser style={{ marginRight: 10 }} size={20} /> Account
              </span>
              <span>
                <FaPen
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/${userData.userId.trim().toLowerCase()}/profile`)
                  }
                />
              </span>
            </h2>
            <div className="account-info">
              <p>Username: Max Essien</p>
              <p>Email: max@gmail.com</p>
            </div>
            <button
              onClick={() => handleLogout()}
              className="settings-logout-btn"
            >
              Log Out
            </button>
          </section>

          <section className="preference-settings">
            <h2>
              <FaSlidersH style={{ marginRight: 10 }} size={20} /> Preference
            </h2>
            <div className="theme-settings">
              <h3>Theme</h3>
              <label
                style={{
                  background:
                    selectedTheme === "system"
                      ? isDarkMode
                        ? "var(--blue-border)"
                        : "rgba(106, 150, 156, 1)"
                      : "none",
                }}
                htmlFor="system-theme-preference"
              >
                <input
                  type="radio"
                  name="theme-setttings-input"
                  id="system-theme-preference"
                  value={"system"}
                  onChange={(e) => handleSelectedTheme(e)}
                />
                System (default)
              </label>
              <label
                style={{
                  background:
                    isDarkMode && selectedTheme !== "system"
                      ? "var(--blue-border)"
                      : "none",
                }}
                htmlFor="dark-theme-preference"
              >
                <input
                  type="radio"
                  name="theme-setttings-input"
                  id="dark-theme-preference"
                  value={"dark"}
                  onChange={(e) => handleSelectedTheme(e)}
                />
                Dark
              </label>
              <label
                style={{
                  background:
                    !isDarkMode && selectedTheme !== "system"
                      ? "rgba(106, 150, 156, 1)"
                      : "none",
                }}
                htmlFor="light-theme-preference"
              >
                <input
                  type="radio"
                  name="theme-setttings-input"
                  id="light-theme-preference"
                  value={"light"}
                  onChange={(e) => handleSelectedTheme(e)}
                />
                Light
              </label>
            </div>
            <div className="resets">
              <button className="reset-progress">
                Reset Current Quiz Progress
              </button>
            </div>
          </section>
        </main>
      </UserAccountLayout>
    </>
  );
}

export default UserSettings;
