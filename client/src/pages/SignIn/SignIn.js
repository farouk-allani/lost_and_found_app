import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { signIn } from "../../JS/actions/user";
import ErrorsNotifications from "./../../components/Notifications/ErrorsNotifications";
import "react-toastify/dist/ReactToastify.css";
import "./SignIn.css";
const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const errorsback = useSelector((state) => state.userReducer.errors);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleSignIn = () => {
    dispatch(signIn(user, history));
  };
  const handleUser = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e, data) => {
    console.log(data);
  };
  console.log(watch("example"));
  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register("Email", {
            required: true,
            pattern: ".+@globex.com",
          })}
          type="email"
          name="email"
          placeholder="Enter your email"
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
        <button
          {...register("Submit", {
            required: true,
          })}
          type="submit"
          variant="contained"
          size="small"
          onClick={handleSignIn}
        >
          Singn in
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

export default SignIn;
