import { useForm } from "react-hook-form";
import "../scss/form-fields.scss";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserData from "../../stores-component/UsersData";

function RegisterForm() {
  const {fetchUsersData} = useUserData()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate()

  const submitForm = (data) => {
    async function submitData() {
      try {
        const userExist = await fetchUsersData(data, 'register')
        if (!userExist){
          console.log(userExist)
          const response = await axios.post("http://127.0.0.1:5000/register", data);
          const result = response;
          toast.success("Registration Successful");
          navigate('/login')
          console.log(result);
        }else{
          toast.error('User already exists')
        }
      } catch (error) {
        console.error("Submission failed:", error);
      }
    }
    submitData();
  };
  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit(submitForm)}
        className="user-form"
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </label>
        <label htmlFor="email">
          Email{" "}
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
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
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                message: "Password must contain a letter and anumber",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>
        <label htmlFor="confirm-password">
          Confirm password
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm Password",
              validate: (value) =>
                value === watch("password") || "Passwords must  match",
            })}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </label>

        <button type="submit" disabled={isSubmitting ? true : false}>
          Sign Up
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

export default RegisterForm;
