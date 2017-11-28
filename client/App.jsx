// vim:ts=2:et

const contentNode = document.getElementById('contents');

import PostList from './PostList.jsx';

const component = <PostList />;
ReactDOM.render(component, contentNode); // Render the component inside the content Node

