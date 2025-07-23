import { useForm } from "react-hook-form";
import "../scss/form-fields.scss";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUserData from "../../stores-component/UsersData";
// import { useState } from "react";

function LoginForm() {
  const { fetchUsersData, isLoading, fetchUserAccountData } =
    useUserData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  // const admin = {
  //   adminEmail: "admin@gmail.com",
  //   adminPassword: "maxadmin12354",
  // };

  const submitForm = async (data) => {
    try {
      const user = await fetchUsersData(data, "login");
      console.log(user)
      if (user) {
        console.log(user, 'user')
        localStorage.setItem("session", JSON.stringify(user.sessionToken))
        const res = await fetchUserAccountData(user);
        console.log(res, "res")
        if (res){
          toast.success("Login Successful");
          setTimeout(()=>{
            navigate(`/${user.userId.trim().toLowerCase()}/dashboard`);
          }, 3000)
        }
      } else {
        console.log(user, 'fff');
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      console.log(error)
      toast.error("There was an error, please try again later")
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="user-form">
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>

        <button type="submit" disabled={isSubmitting ? true : false}>
          {!isLoading ? "Log In" : "Logging In..."}
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={true}
        hideProgressBar={false}
        closeOnClick={true}
      />
    </>
  );
}

export default LoginForm;
