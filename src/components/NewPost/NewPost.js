import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    postHandler= ()=> {
        const post = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        axios.post('https://jsonplaceholder.typicode.com/posts/',post).then(response => {
          console.log(response);
        });
    }

    getInputData= (e,attr)=> {
      console.log(e.target.value);
      return  this.setState({attr: e.target.value});
    }

    render () {

      return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onKeyUp={(event) => this.getInputData(event,'title') } />
                <label>Content</label>
                <textarea rows="4" value={this.state.content}  onKeyUp={(event) => this.getInputData(event,'content') } />
                <label>Author</label>
                <select value={this.state.author}  onChange={(event) => this.getInputData(event,'author') } >
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={()=> this.postHandler()}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;