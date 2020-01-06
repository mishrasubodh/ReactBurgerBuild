import React, { Component } from "react";
import axios from "../../../axios";
import "./Posts.css";
import Post from "../../../components/Post/Post";
import Fullpost from '../FullPost/FullPost';
import { Route  } from 'react-router-dom'
class Posts extends Component {
  state = {
    posts: []
    // selectedId:null,
    // error:false
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(responce => {
        const posts = responce.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "subodh"
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log(responce)
      })
      .catch(error => {
        console.log(error);
        // this.setState({error:true})
      });
  }

  postSelectedHand = id => {
    //this.props.history.push({ pathname: "/" + id });
         this.props.history.push('/posts/' + id)
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong...!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={"/posts" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            Clicked={() => this.postSelectedHand(post.id)}
          />
          // </Link>
        );
      });
    }
    return(
         <div> 
              <section className="Posts">
                   {posts}
                   </section>
              <Route path={this.props.match.url + '/:id'} exact component={Fullpost} />
         </div>
    ) ;
  }
}

export default Posts;
