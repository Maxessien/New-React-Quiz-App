import { useEffect } from "react";
import "../scss/form-page.scss";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterFooter from "./RegisterFooter";
import HomePageHeader from "../../home-components/HomeHeader";
import useDarkMode from "../../stores-component/DarkLightThemeStore";
// import BgDesign from "../../home-components/BgDesign";

function Register() {
  const { isDarkMode } = useDarkMode();
  useEffect(() => {
    document.body.style.background = isDarkMode
      ? "linear-gradient(to bottom, rgb(0, 21, 27), rgb(38, 66, 75))"
      : "linear-gradient(to bottom, rgb(150, 149, 149), rgb(206, 206, 206))";
    return () => (document.body.style.background = "");
  }, [isDarkMode]);

  return (
    <>
      <HomePageHeader />
      <main className="form-wrapper">
        <section className="form-content">
          <RegisterHeader />
          <RegisterForm />
          <RegisterFooter />
        </section>
      </main>
    </>
  );
}

export default Register;
