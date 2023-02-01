import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

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

    dispatch(login(userLogin));
  };

  return (
    <>
      {user.authorization ? (
        <Navigate to="/task" />
      ) : (
        <div className="wrapper">
          <form className="form1" onSubmit={handleSubmit}>
            <h2>Login User</h2>
            <input
              className="un "
              type="email"
              name="email"
              placeholder="Email"
              align="center"
              onChange={handleChange}
            />
            <input
              className="pass"
              type="password"
              name="password"
              placeholder="Password"
              align="center"
              onChange={handleChange}
            />
            <br></br>
            <input type="submit" value="Login" />
            <p class="register" align="center">
              <a href="/register">No tiene una cuenta? Registrate</a>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
