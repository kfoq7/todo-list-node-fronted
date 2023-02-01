import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosFetch } from "../axios";

const RegisterPage = () => {
  const [userRegiser, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserRegister({
      ...userRegiser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(userRegiser).some((value) => value === "")) {
      console.log("Campos vacios");
      return;
    }

    console.log(userRegiser);
    try {
      const { data } = await axiosFetch.post("/user/register", userRegiser);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <form className="form1" onSubmit={handleSubmit}>
        <h2>Register User</h2>

        <div>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="password" name="confirmPass" onChange={handleChange} />
        </div>
        <input type="submit" value="Register" />
        <br />

        <Link to="/"> Ya tienes una cuenta? Inicia Sesión</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
