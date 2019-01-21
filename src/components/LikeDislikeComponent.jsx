import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export class LikeDislikeComponent extends Component {
  state = {
    loading: true,
    article: {},
    likeColor: "#000",
    dislikeColor: "#000"
  };

  componentDidMount() {
    const accesToken = localStorage.getItem("user");
    axios.defaults.headers.common["Authorization"] = "Token " + accesToken;

    axios
      .get(
        "https://ah-backend-poseidon-staging.herokuapp.com/api/articles/testing-mock-20190121062740203476"
      )

      .then(res => {
        console.log(res.data);
        this.setState({ loading: false, article: res.data.articles });
      });
  }

  onLike = () => {
    const accesToken = localStorage.getItem("user");
    axios.defaults.headers.common["Authorization"] = "Token " + accesToken;
    const { article } = this.state;
    axios
      .post(
        `https://ah-backend-poseidon-staging.herokuapp.com/api/articles/${
          article.id
        }/like/`
      )

      .then(res => {
        this.toggleColor();
        this.setState(prevState => ({
          article: {
            ...prevState.article,
            likes: res.data.likes,
            dislikes: res.data.dislikes
          }
        }));
      });
  };

  ondislike = () => {
    const accesToken = localStorage.getItem("user");
    axios.defaults.headers.common["Authorization"] = "Token " + accesToken;
    const { article } = this.state;
    axios
      .post(
        `https://ah-backend-poseidon-staging.herokuapp.com/api/articles/${
          article.id
        }/dislike/`
      )
      .then(res => {
        this.toggleDislikeColor();
        this.setState(prevState => ({
          article: {
            ...prevState.article,
            likes: res.data.likes,
            dislikes: res.data.dislikes
          }
        }));
      });
  };

  toggleColor = () => {
    let newColor = this.state.likeColor === "#000" ? "#800000" : "#000";
    this.setState({ likeColor: newColor });
  };

  toggleDislikeColor = () => {
    let newColor = this.state.dislikeColor === "#000" ? "#800000" : "#000";
    this.setState({ dislikeColor: newColor });
  };
  render() {
    const { loading, article, likeColor, dislikeColor } = this.state;
    return (
      <div className="container">
        <div className="container">
          {loading ? (
            <p>.... Loading</p>
          ) : (
            <div>
              <h1>{article.title}</h1>

              <p>{article.body}</p>
              <p>{article.likes} Like(s)</p>
              <p> {article.dislikes} Dislikes</p>
            </div>
          )}
        </div>
        <FontAwesomeIcon
          icon="thumbs-up"
          color=""
          size="2x"
          style={{ color: likeColor }}
          onClick={this.onLike}
        />
        <br />
        <FontAwesomeIcon
          icon="thumbs-down"
          color=""
          size="2x"
          style={{ color: dislikeColor }}
          onClick={this.ondislike}
        />
      </div>
    );
  }
}

export default LikeDislikeComponent;
