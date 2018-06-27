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
            selectedPostId: null
        }
    }
    
    postClicked= (id)=>{
      this.setState({selectedPostId: id});
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res=> {
          const updateValue = res.data.splice(0,4);
          const updateNewValue = updateValue.map(post => {
            return {
              ...post,
              author: 'max'
            }
          })
           this.setState({posts: updateNewValue});
        });
    }
    render () {
        const posts = this.state.posts.map((post,index) => {
          return <Post key={post.id} title={post.title} author={post.author} clicked={()=>this.postClicked(post.id)} />
        })
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