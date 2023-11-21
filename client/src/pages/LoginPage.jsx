// LoginPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signin(data);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <>
      <LoginForm onSubmit={onSubmit} />

    </>
  );
}

export default LoginPage;
