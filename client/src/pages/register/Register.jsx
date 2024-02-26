import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://lifeloop-final-deplay.onrender.com/api/auth/register", inputs);
      console.log("hesadallow w");
    } catch (err) {
      setErr(err.response.data);
      console.log("hellow w");
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Parath</h1>
          <p>
          This is where user logins.Made by Parath Safaya for SDE Internship.
            The authentication happens by checking if user exists with the username and password provided.Here user is registered.
            The password is hashed using bcryptjs to make password secure in case database breach.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <div>
            {err && err}
            </div>
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
