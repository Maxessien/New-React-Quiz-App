import { useEffect } from "react";
import "../scss/form-page.scss";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterFooter from "./RegisterFooter";
import HomePageHeader from "../../home-components/HomeHeader";

function Register() {
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
          <RegisterHeader />
          <RegisterForm />
          <RegisterFooter />
        </section>
      </main>
    </>
  );
}

export default Register;


