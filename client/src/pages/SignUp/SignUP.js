import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { signUp } from "../../JS/actions/user";
import ErrorsNotifications from "../../components/Notifications/ErrorsNotifications";
import "./SignUp.css";

const SignUP = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const errorsback = useSelector((state) => state.userReducer.errors);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignUp = () => {
    dispatch(signUp(user, history));
  };
  const handleUser = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (data) => console.log(data);
  console.log(watch("example"));

  return (
    <div className="sign-up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          {...register("UserName", {
            required: true,
          })}
          type="text"
          placeholder="Enter your username"
          name="username"
          onInput={handleUser}
          value={user.username}
        />
        {!user.username
          ? errors.UserName && <p>Field can't be empty!</p>
          : null}
        <label>Email</label>
        <input
          {...register("Email", {
            required: true,
            pattern: ".+@globex.com",
          })}
          type="email"
          placeholder="Enter your email"
          name="email"
          onInput={handleUser}
          value={user.email}
        />
        {!user.email ? errors.Email && <p>Field can't be empty!</p> : null}
        {!user.email.match("@")
          ? errors.Email && <p>It should be an email!</p>
          : null}
        <label>Password</label>
        <input
          {...register("Password", {
            required: true,
            min: 6,
          })}
          type="password"
          name="password"
          min={6}
          placeholder="Enter your Password"
          onInput={handleUser}
          value={user.password}
        />
        {!user.password
          ? errors.Password && <p>You must specify a password!</p>
          : null}
        {user.password.length < 6
          ? errors.Password && <p>Password must be at least 6 characters!</p>
          : null}

        <Link to="/signIn">Already have an account? Sign in</Link>
        <button
          {...register("Submit", {
            required: true,
          })}
          type="submit"
          variant="contained"
          size="small"
          onClick={handleSignUp}
        >
          Sign up
        </button>
        {errorsback
          ? errors.Submit && (
              <span>
                {errorsback &&
                  errorsback.map((el) => <ErrorsNotifications errors={el} />)}
              </span>
            )
          : null}
      </form>
    </div>
  );
};

export default SignUP;
