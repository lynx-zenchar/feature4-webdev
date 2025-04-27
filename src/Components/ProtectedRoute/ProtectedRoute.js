import React from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/auth");
  };

  if (checkUser()) {
    return children; // ← render whatever is inside the ProtectedRoute
  } else {
    return (
      <div>
        <p>Unauthorized!</p>
        <button onClick={goBackHandler}>Go Back</button>
      </div>
    );
  }
};

export default ProtectedRoute;
