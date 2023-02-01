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
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Login User</h2>
            <div className="container">
              <label>
                <b>Email:</b>
              </label>
              <input type="email" name="email" onChange={handleChange} />
            </div>
            <div className="container">
              <label>
                <b>Password:</b>
              </label>
              <input type="password" name="password" onChange={handleChange} />
              <br />
              <input type="submit" value="Login" />
            </div>

            <div className="container">
              <Link to="/register"> No tiene una cuenta? Registrate</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
