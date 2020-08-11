import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = () => {
    const body = {
      email: email,
      password: password,
    };
    axios
      .post(baseUrl, body)
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        alert("login efetuado com sucesso");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log(email,password);

  return (
    <div id="login-container">
      <input
        value={email}
        onChange={onChangeEmail}
        type="email"
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={onChangePassword}
        type="password"
        placeholder="Senha"
        required
      />
      <button onClick={handleLogin}>Login</button>
      <button>Cadastrar</button>
    </div>
  );
};

export default LoginPage;
