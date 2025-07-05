import { useEffect } from "react";
import "../scss/form-page.scss";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LogInFooter";
import LoginForm from "./LogInForm";
import HomePageHeader from "../../home-components/HomeHeader";
// import BgDesign from "../../home-components/BgDesign";

function Login() {
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to bottom, rgb(0, 21, 27), rgb(38, 66, 75))";
    return () => (document.body.style.background = "");
  }, []);

  return (
    <>
    <HomePageHeader />
      <main className="form-wrapper">
        <section className="form-content">
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </section>
      </main>
    </>
  );
}

export default Login;


