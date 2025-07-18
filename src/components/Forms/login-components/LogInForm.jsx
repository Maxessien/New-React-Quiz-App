import { useForm } from "react-hook-form";
import "../scss/form-fields.scss";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const admin = {
    adminEmail: "admin@gmail.com",
    adminPassword: "maxadmin12354",
  };

  const submitForm = ({ email, password }) => {
    const { adminEmail, adminPassword } = admin;
    email === adminEmail && password === adminPassword
      ? navigate("/admin/dashboard")
      : toast.error("Only admin access is allowed");
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="user-form">
        <label htmlFor="email">
          Email{" "}
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
          Log In
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
