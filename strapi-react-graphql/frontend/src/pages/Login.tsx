import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const { getUser, addAuthenticatedUser } = useAuth();

  const currentUser = getUser()
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = () => {
      if (currentUser !== null) {
        return navigate("/");
      }
    };
    checkUser();
  }, [currentUser]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    axios
      .post("http://localhost:1337/api/auth/local", data)
      .then(function (response) {
        localStorage.setItem("JWT", response.data.jwt);
        addAuthenticatedUser(response.data.user);
        return navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="page-layout relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="form-layout w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg border-t-4 border-gray-600">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Login
        </h1>
        <p className="text-center">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="underline cursor-pointer font-bold text-blue-800"
          >
            Sign Up
          </Link>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
