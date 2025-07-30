import { useForm } from "react-hook-form";
import "../scss/form-fields.scss";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUserData from "../../stores-component/UsersData";
// import { useState } from "react";

function LoginForm() {
  const { fetchUsersData, isLoading, fetchUserAccountData, setUserState } =
    useUserData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const submitForm = async (data) => {
    setUserState("userAccountData", []);
    try {
      const user = await fetchUsersData(data, "login");
      if (user) {
        sessionStorage.setItem("session", JSON.stringify(user.sessionToken));
        navigate(`/${user.userId.trim().toLowerCase()}/dashboard`);
        await fetchUserAccountData(user);
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error, please try again later");
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
