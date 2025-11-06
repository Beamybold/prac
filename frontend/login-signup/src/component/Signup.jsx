import  { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Form.css";

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "", email: "", password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [submit, setSubmit] = useState(false);
 

  function validate() {
    const validateErrors = {};

    if (!userInfo.name.trim()) {
      validateErrors.name = "Enter your fullname";

    }else if (userInfo.name.length < 2){
      validateErrors.name = "Name must exceed 2 characters";
    }

    if (!userInfo.email) {
      validateErrors.email = "Enter your email"; 
    
    } else if (!userInfo.email.includes("@")) {
      validateErrors.email = "Incorrect email address";
    }


    if (!userInfo.password) {
      validateErrors.password = "Enter your password";
    } else if (!userInfo.password.length === 8) {
      validateErrors.password = "password length must be 8 characters";
    }
    return validateErrors;

    }


    function handleChange(e) {
      const { name, value } = e.target;
      setUserInfo ({...userInfo, [name]: value});

      if (error[name]) {
        setError({...error, [name]: ""})
      }
      setApiError("");
      
    }

    async function handleSubmit(e) {
      e.preventDefault();
      
      const errorsValidation = validate();
      
      if (Object.keys(errorsValidation).length > 0) {
        setError(errorsValidation);
        return;
      
    }

    try {
      setLoading(true);
      setError({});
      setSuccess("");

      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error (data.detail || "Sign up unsuccessful. Please retry!" );
      }

      setSubmit(true);
      setSuccess("Registration successful");
      setUserInfo({name: "", email: "", password: ""});
    } 
    catch (error) {
      setApiError(error.message)
    }
    finally {
    setLoading(false);
  }


  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="input">
        <h2>Welcome back </h2>
        <h4>Kindly sign in to continue.</h4>

        <div className="name-container">
          <label>Name:</label>
          <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="Enter your name"
          />


          {error.name && <p style={{color: "red", margin: 0, marginTop: 5, fontSize: 16, textAlign: "left"}}>{error.name}</p>};
        </div>

        <div className="name-container">
          <label>Email:</label>
          <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          />
          {error.email && <p style={{color: "red", margin: 0, marginTop: 5, fontSize: 16, textAlign: "left"}}>{error.email}</p>};

        </div>

        <div className="name-container">
          <label>Password:</label>
          <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Enter your password"
          />
          {error.password && <p>{error.password}</p>}

        </div>

        <button className="sign-in" type="submit" disabled= {loading}>
          <NavLink to= "/dashboard" className="nav-link">
          {loading ? "Logging in..." : "Login"}

          </NavLink>
        </button>


        {apiError && <p style={{color: "green", margin: 0, marginTop: 6, fontSize: 16, textAlign: "center"}}>{apiError}</p>}
        {success && <p>{success}</p>}


        <p>Don't have an account? <span><NavLink to= "/" className="navigate">Sign up</NavLink></span></p>

      </form>

    </div>
  )



}



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("")
//     setSuccess("")
    
//     if (!name.trim() || !email.includes("@") || password.length === 8) {
//       setError("Fill all fields corectly");
//     } else {
//       setSuccess("You have successfully sign up! Redirecting ...");
//       setTimeout(() => navigate("/login"), 2000);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <input placeholder="Example@.com" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input placeholder="Minimum of 8 characters" type="password" value={pass} onChange={(e) => setPassword(e.target.value)} />
//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>}
//         <button>Sign Up</button>
//         <p className="link">Already have an account? <NavLink to="/login">Login</NavLink></p>
//       </form>
//     </div>
//   );
// }

export default SignUp;



  