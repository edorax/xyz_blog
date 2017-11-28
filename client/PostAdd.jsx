// vim:ts=2:et

'use strict';

export default class PostAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.postAdd;
    this.props.createPost({
      created: new Date(),
      author: form.author.value,
      title: form.title.value,
      content: form.content.value,
    });
    // clear the form for the next input
    form.author.value = "";
    form.title.value = "";
    form.content.value = "";
  }

  render() {
    return (
      <div>
        <form name="postAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="author" placeholder="Author" />
          <input type="text" name="title" placeholder="Title" />
          <textarea type="text" name="content" placeholder="Content" />
          <button>Add</button>
        </form>
      </div>
    )
  }
}

