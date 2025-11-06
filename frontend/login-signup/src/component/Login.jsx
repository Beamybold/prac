import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import './Form.css';

function Login() {
   const [userInfo, setUserInfo] = useState({
    email: "", password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  
  
  function validate() {
    const validateErrors = {};

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

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error (data.detail || "Invalid email or password!" );
      }

      setSuccess("Login successful!");

    } catch (error) {
      setApiError(error.message)
    }
    finally {
    setLoading(false);
  }

}

return (
  <div className="login-container">
      <form onSubmit={handleSubmit} className="input">
        <h2>Create an account</h2>
        <h4>Kindly sign up to continue.</h4>

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

          {error.email && <p>{error.email}</p>}

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

        <button className="sign-up" type="submit" disabled= {loading}>
          <NavLink to= "/" className="nav-link">
          {loading ? "Signing up..." : "Sign up"}

          </NavLink>
        </button>


        {apiError && <p style={{color: "green", margin: 0, marginTop: 6, fontSize: 16, textAlign: "center"}}>{apiError}</p>}
        {success && <p>{success}</p>}


        <p>Already have an account? <span><NavLink to= "/" className="navigate">Sign in</NavLink></span></p>

      </form>

    </div>
  )



 



   

    }













//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email.includes("@") || !password) {
//       setMessage("Invalid input");
//     } else {
//       setMessage("You are logged in!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         {message && <p className={message.includes("Login successful!") ? "success" : "error"}>{message}</p>}
//         <button>Login</button>
//         <p className="link">Don't have an account?<NavLink to="/">Sign up</NavLink></p>
//       </form>
//     </div>
//   );
// }

export default Login;





        
   