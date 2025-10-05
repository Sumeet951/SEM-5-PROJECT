import React from "react";
import { useForm } from "react-hook-form";

function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [success,setSuccess] = React.useState(false);

  async function onSubmit(data) {
    
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", { message: "Passwords do not match." });
        return;
      }

      let response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      });
      let resData = await response.json();
      if (resData.success) {
        setSuccess(true);
      } else {
        setError("root", { message: resData.message });
      }
    } catch (err) {
      setError("root", { message: err.message });
    }
  }
  return (
    <div className="tab-pane fade" id="signup" role="tabpanel">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
        <input
          type="text"
          name="name"
          className="form-control rounded-pill"
          placeholder="username"
          {...register("username", {
            required: "Username is required.",
          })}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <input
          type="email"
          name="email"
          className="form-control rounded-pill"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />

        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          type="password"
          name="password"
          className="form-control rounded-pill"
          placeholder="Create Password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <input
          type="password"
          name="confirmPassword"
          className="form-control rounded-pill"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Re-entered Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn btn-success rounded-pill w-100"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <span className="text-red-500 text-center">
            {errors.root.message}
          </span>
        )}
        {success && (
          <span className="text-green-500 text-center">
            User Registered.
          </span>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
