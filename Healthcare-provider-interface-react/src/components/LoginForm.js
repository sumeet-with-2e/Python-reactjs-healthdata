import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
const LoginForm = ({
  username,
  password,
  rememberMe,
  setUsername,
  setPassword,
  setRememberMe,
  handleLogin,
  handleGoogleLogin,
}) => {
  return (
    <form
      onSubmit={handleLogin}
      className="shadow-gray-300 shadow-lg flex flex-col w-[350px] "
    >
      <h1 className="text-center font-semibold ">Cool App</h1>
      <div className="flex flex-col space-y-2">
        <h4>Username</h4>
        <input
          type="email"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2 mt-3">
        <h4>Password</h4>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
      </div>
      <div className="flex flex-row justify-between mt-2">
        <div className="flex flex-row space-x-2">
          <input
            type="checkbox"
            checked={rememberMe}
            className="w-[14px] h-[14px] mt-1"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember Me</label>
        </div>
        <a href="http://localhost:3000/">Forgot password?</a>
      </div>

      <br />
      <button type="submit">Log In</button>
      <br />
      <div className="horizontal-bar">
        <hr className="line" />
        <span className="or">or</span>
        <hr className="line" />
      </div>
      <div
        className="google-signin flex flex-row w-full space-x-3 justify-center items-center"
        onClick={handleGoogleLogin}
      >
        <a>Sign in with Google</a>
        <GoogleIcon className="text-rose-700" />
      </div>
    </form>
  );
};

export default LoginForm;
