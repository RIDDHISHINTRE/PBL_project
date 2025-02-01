import React, { use } from "react";
import { useState } from "react";
import "./loginSignup.css";

// import user_icon from '../Assets/person.png'
// import email_icon from '../Assets/email.png'
// import password_icon from '../Assets/password.png'

const LoginSignup = () => {
  const [islogin, setlogin] = useState(true);
  const [signupstate, setsignupstate] = useState("");
  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={islogin ? "active" : ""}
            onClick={() => {
              setlogin(true);
              setsignupstate("");
            }}
          >
            Login
          </button>
          <button
            className={!islogin ? "active" : ""}
            onClick={() => setlogin(false)}
          >
            Signup
          </button>
        </div>

        {!islogin && signupstate === "" ? (
          <>
            <h2>Sign Up As</h2>
            <button
              className="choice-btn"
              onClick={() => setsignupstate('student')}
            >
              Student
            </button>
            <button
              className="choice-btn"
              onClick={() => setsignupstate('alumni')}
            >
              Alumni
            </button>
            <p>
              Already a Member? <a href="#" onClick={() => setlogin(true)}>Login Now</a>
            </p>
          </>
        ) : islogin ? (
          <>
            <div className="form">
              <h2>Login Form</h2>
              <input type="email" name="" id="" placeholder="email" />
              <input type="password" name="" id="" placeholder="password" />
              <button>Login</button>

              <a href="/">Forgot Password</a>
              <p>
                Not a Member?
                <a href="#" onClick={() => setlogin(false)}>
                  Signup Now
                </a>
              </p>
            </div>
          </>
        ) : signupstate === 'student' ? (
          <>
            <div className="form">
              <h2> Student Signup Form</h2>
              <input type="email" name="email" placeholder="email" />
              <input type="password" name="password" placeholder="password" />
              <input
                type="password"
                name="confirm"
                placeholder="confirm password"
              />
              <input type="text" placeholder="College Name" />

              <select name="Year" id="Select Year">
                <option value="first">First year</option>
                <option value="second">Second year</option>
                <option value="third">Third year</option>
                <option value="fourth">Fourth year</option>
              </select>
              <button>Sign Up</button>
            </div>
          </>
        ) : (
          <>
            <div className="form">
              <h2> Alumni Signup Form</h2>
              <input type="email" name="email" placeholder="email" />
              <input type="password" name="password" placeholder="password" />
              <input
                type="password"
                name="confirm"
                placeholder="confirm password"
              />
              <input type="text" placeholder="Graduate College Name" />

              <input type="text" placeholder="Job (Company)" />
              <button>Sign Up</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
