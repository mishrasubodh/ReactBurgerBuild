import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
//import Axios from "axios";
// import axios from '../../axios'
import axios from '../../axios'
class Blog extends Component {
  state = {
    posts: [],
    selectedId:null,
    error:false
  };
  componentDidMount() {
    axios.get('/posts')
    .then(responce => {
        const posts =responce.data.slice(0,4);
        const updatedPosts = posts.map(post =>{
            return{
                ...post,
                author:'subodh'
            }
        })
      this.setState({ posts: updatedPosts});
    }).catch(error=>{
      this.setState({error:true})
       this.setState()
    });
    this.setState();
  }
postSelectedHand = (id) =>{
this.setState({selectedId: id})
}

  render() {
let posts= <p style={{textAlign: 'center'}}>Something went wrong...!</p>;
if(!this.state.error){
 posts = this.state.posts.map(post => {
      return <Post 
      key={post.id} 
      title={post.title} 
      author={post.author}
      Clicked={()=>this.postSelectedHand(post.id)}
       />;
    });
}
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
