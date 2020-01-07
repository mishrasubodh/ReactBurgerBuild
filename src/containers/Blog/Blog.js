import React, { Component } from "react";
import Posts from './Posts/Posts';
import { Route ,NavLink, Switch,Redirect} from 'react-router-dom';
import "./Blog.css";
 import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(()=>{
  return import('./NewPost/NewPost');
})

class Blog extends Component {
  state = {
  auth: true
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
     {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> :null}
       <Route path="/posts"  component={Posts} /> 
       <Route render={()=><h1>not found</h1>}  />    
       {/* <Route path="/"  component={Posts} /> */}
       {/* <Redirect from="/" to="/posts" /> */}
</Switch>
      </div>
    );
  }
}

export default Blog;
