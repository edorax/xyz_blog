// vim:ts=2:et

'use strict';

///const validPostStatus = {
///  New: true,
///  Open: true,
///  Assigned: true,
///  Fixed: true,
///  Verified: true,
///  Closed: true,
///};

const postFieldType = {
  author: 'required',
  created: 'required',
  title: 'required',
  content: 'required',
};

function validatePost(post) {
  for (const field in postFieldType) {
    const type = postFieldType[field];
    if (!type) {
      delete post[field];
    } else if (type === 'required' && !post[field]) {
      return `${field} is required.`;
    }
  }
  ///if (!validPostStatus[post.status])
  ///  return `${post.status} is not a valid status.`;
  return null;
}

module.exports = {
  validatePost: validatePost
};

