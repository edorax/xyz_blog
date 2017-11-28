// vim:ts=2:et

import PostFilter from './PostFilter.jsx';
import PostAdd from './PostAdd.jsx';

const PostRow = (props) => (
  <div>
    <p>{props.post.created.toDateString()}</p>
    <h3>{props.post.title}</h3>
    <p><span>By</span> {props.post.author}</p>
    <p>{props.post.content}</p>
  </div>
)

function PostTable(props) {
  const postRows = props.posts.map(post => <PostRow key={post._id} post={post} />);
  return (
    <div>
      {postRows}
    </div>
  )
}

export default class PostList extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };

    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/posts').then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach(post => {
            post.created = new Date(post.created);
          });
          this.setState({ posts: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch posts: " + error.message);
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server: ", err);
    });
  }

  createPost(newPost) {
    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedPost => {
          updatedPost.created = new Date(updatedPost.created);
          const newPosts = this.state.posts.concat(updatedPost);
          this.setState({ posts: newPosts });
        });
      } else {
        response.json().then(error => {
          alert("Failed to add post: " + error.message)
        });
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  render() {
    return (
      <div>
        <h1>Simple Blog</h1>
        <PostTable posts={this.state.posts} />
        <hr />
        <PostAdd createPost={this.createPost} />
      </div>
    )
  }
}

