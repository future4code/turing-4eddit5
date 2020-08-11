import React, {useState} from 'react';
import axios from 'axios'
import './style.css'
import {useHistory} from 'react-dom'

const baseUrl = `https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-leonardo-gomes`

const useForm = initialValues => {
  const [form, setForm] = useState(initialValues);
  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };
  const cleanForm = () => {
    setForm(initialValues);
  };
  return {form, onChange, cleanForm};
};

function RegisterPage() {
  const history = useHistory();
  const {form, onChange, cleanForm} = useForm({name: "", email: "", password: ""});

  const handleInputChange = event => {
    const {name, value} = event.target;

    onChange(name, value);
  };

  const registerUser = (event) => {
    event.preventDefault()
    const body = {
      name: form.name,
      email: form.email,
      password: form.password
    }
    axios.post(baseUrl, body)
    .then(response => {
      window.localStorage.setItem("token", response.data.token);
      history.push("/FeedPage");
      cleanForm()
      alert("Usuário criado com sucesso!")
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  return (
    <div id='register-container'>
      <form onSubmit={registerUser}>
        <input 
          value={form.name}
          name= "name"
          placeholder= "Nome do usuário"
          type="text"
          minLength="3"
          onChange={handleInputChange}
          required
        />
        <input 
          value={form.email}
          name= "email"
          placeholder= "E-mail"
          type='email'    
          onChange={handleInputChange}
          required
        />
        <input 
          value={form.password}
          name= "password"
          placeholder="Senha" 
          type='password'
          onChange={handleInputChange}
          required  
        />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
