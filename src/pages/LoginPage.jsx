import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const user = useSelector((state) => state.auth);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(login({ userLogin, toast }));
    dispatch(login(userLogin, toast));
  };

  return (
    <>
      {user.authorization ? (
        <Navigate to="/task" />
      ) : (
        <>
          {user.errors}
          <div className="wrapper">
            <form className="form1" onSubmit={handleSubmit}>
              <h2>Login User</h2>
              <input
                className="input-group"
                type="email"
                name="email"
                placeholder="Email"
                align="center"
                onChange={handleChange}
              />
              <input
                className="input-group"
                type="password"
                name="password"
                placeholder="Password"
                align="center"
                onChange={handleChange}
              />
              <br></br>
              <input className="submit" type="submit" value="Login" />
              <p className="actionnav">
                Don't have an account?
                <br />
                <a href="/register">Register here</a>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;
