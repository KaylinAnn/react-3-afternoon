import React, { Component } from "react";

import "./App.css";
import Post from "./Post/Post";
import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import axios from "axios";

const baseUrl = "https://practiceapi.devmountain.com/api/posts";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get(`${baseUrl}`).then(res => {
      this.setState({
        posts: res.data
      });
    });
  }

  updatePost(id, text) {
    axios.put(`${baseUrl}?id=${id}`, { text }).then(res => {
      this.setState({
        posts: res.data
      });
    });
  }

  deletePost(id) {
    axios.delete(`${baseUrl}?id=${id}`).then(res => {
      this.setState({ posts: res.data });
    });
  }

  createPost(text) {
    axios
      .post(`${baseUrl}`, { text })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
