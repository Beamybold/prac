import SignUp from "./component/Signup.jsx";
import Login from "./component/Login.jsx"; 
import Dashboard from "./component/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

  );
}

export default App;
