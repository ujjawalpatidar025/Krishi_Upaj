import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  const Component = props.component;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [Component]);

  return <Component />;
};

export default ProtectedRoute;
