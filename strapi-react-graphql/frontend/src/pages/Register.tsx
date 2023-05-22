import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { addAuthenticatedUser } = useAuth();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    axios
      .post("http://localhost:1337/api/auth/local/register", data)
      .then(function (response) {
        localStorage.setItem("JWT", response.data.jwt);
        addAuthenticatedUser(response.data.user)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="page-layout relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="form-layout w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg border-t-4 border-gray-600">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Register
        </h1>
        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline cursor-pointer font-bold text-blue-800"
          >
            Login
          </Link>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              required
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
              required
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
