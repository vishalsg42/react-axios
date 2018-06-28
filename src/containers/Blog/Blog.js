import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';
class Blog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            posts: [],
            selectedPostId: null,
            error: false
        }
    }
    
    postClicked= (id)=>{
      this.setState({selectedPostId: id});
    }
    componentDidMount() {
        axios.get('/posts').then(res=> {
          const updateValue = res.data.splice(0,4);
          const updateNewValue = updateValue.map(post => {
            return {
              ...post,
              author: 'max'
            }
          })
           this.setState({posts: updateNewValue});
        })
        .catch( error => {
            this.setState({error: true});
        });
    }
    render () {
        
        let posts = <p>Something went wrong</p>;
        if(!this.state.error) {
            posts = this.state.posts.map((post,index) => {
              return <Post key={post.id} title={post.title} author={post.author} clicked={ ()=>this.postClicked(post.id)} />
            });
        }
        return (
            <div>
                <section className="Posts">
                  {posts}
                </section>
                <section>
                    <FullPost  id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;