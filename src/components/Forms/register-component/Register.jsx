import { useEffect } from "react";
import "../scss/form-page.scss";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterFooter from "./RegisterFooter";
import HomePageHeader from "../../home-components/HomeHeader";
// import BgDesign from "../../home-components/BgDesign";

function Register() {
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
          <RegisterHeader />
          <RegisterForm />
          <RegisterFooter />
        </section>
      </main>
    </>
  );
}

export default Register;


