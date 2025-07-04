import { useEffect } from "react";
import "../scss/form-page.scss";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LogInFooter";
import LoginForm from "./LogInForm";
import HomePageHeader from "../../home-components/HomeHeader";

function Login() {
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to bottom, rgb(5, 56, 71), rgb(63, 114, 129))";
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


