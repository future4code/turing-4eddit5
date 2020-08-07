import React from "react";
import styled from "styled-components";
import "./style.css";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl =
  "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts";

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);
  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };
  const cleanForm = () => {
    setForm(initialValues);
  };
  return { form, onChange, cleanForm };
};

const FeedPage = () => {
  const history = useHistory();
  const [postList, setPostList] = useState([]);
  const { form, onChange, cleanForm } = useForm({ text: "", title: "" });

  useEffect(() => {
    getPost();
  }, [{}]);

  const getPost = () => {
    const token = window.localStorage.getItem("token");

    axios
      .get(baseUrl, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setPostList(response.data.posts);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const createPost = (event) => {
    event.preventDefault();
    const body = {
      text: form.text,
      title: form.title,
    };
    const token = window.localStorage.getItem("token");

    axios
      .post(
        baseUrl,
        {
          headers: {
            authorization: token,
          },
        },
        body
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renderListOfPosts = postList.map((post) => {
    return (
      <div id="card-post">
        <div id="post-container" key={post.id}>
          <h1>Titulo:{post.title}</h1>
          <div id="caixa-texto">Texto:{post.text}</div>
          <div id="box3">
            <span>Pontuação total:{post.userVoteDirection}</span>
            <span>Votos:{post.votesCount}</span>
            <p>Usuario:{post.username}</p>
            <p>Contador de comentarios:{post.commentsCount}</p>
          </div>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="post-container">
      <div>{renderListOfPosts}</div>
      <div >
        <form onSubmit={createPost} id='create-post'>
          <input
            value={form.title}
            name="title"
            placeholder="Titulo"
            type="text"
            minLength="3"
            onChange={handleInputChange}
            required
          />
          <textarea
          rows="5"
          columns="30"
            value={form.text}
            name="text"
            placeholder="Texto"
            type="text"
            onChange={handleInputChange}
            required
          />
          <button>Postar</button>
        </form>
      </div>
    </div>
  );
};

export default FeedPage;

// createdAt: 1596665332023
// id: "1Z0fStsznp3RPvPGHJVV"
// text: "Havia dois caminhões voando. Um Caiu. Por que ou outro continuou voando? PORQUE ERA UMA CAMINHÃO-PIPA. HAUAHAAHAUAH "
// title: "Hmmm... Bem bolada, talvez?"
// userVoteDirection: 1
// username: "diego-m"
// votesCount: 7
