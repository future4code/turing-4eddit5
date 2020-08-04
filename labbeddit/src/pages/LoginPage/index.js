import React from "react";
import './style.css'

function LoginPage() {
  return (
    <div id='login-container'>
      <input 
      type='email'
      placeholder="Email" 
      required/>
      <input 
      type='password'
      placeholder="Senha" 
      required/>
      <button>Login</button>
      <button>Cadastrar</button>
    </div>
  );
}

export default LoginPage;
