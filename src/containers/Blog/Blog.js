import React, { Component } from "react";
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import { Route ,NavLink, Switch,Redirect} from 'react-router-dom'
import Fullpost from './FullPost/FullPost'
import "./Blog.css";
class Blog extends Component {
  state = {
    posts: [],
    selectedId:null,
    error:false
  };
 


  render() {

    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink
               to="/posts"
                exact
                activeClassName="my-active"
                activeStyle={{
                  color:'#fa923f',
                  textDecoration:'underline'
                }}>Posts</NavLink></li>
              <li><NavLink to={{
                pathname:'/new-post',
                hash:"#submit",
                search:'?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>

    
       
 <Switch>
    <Route path="/new-post" component={NewPost}/>
       <Route path="/posts"  component={Posts} />      
   {/* <Route path="/"  component={Posts} /> */}
   <Redirect from="/" to="/posts" />
       </Switch>
      </div>
    );
  }
}

export default Blog;
