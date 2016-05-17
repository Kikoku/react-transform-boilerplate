import React from 'react';

const Comment = ({user, msg}) => (
  <li>
    <strong>{user}</strong> &mdash; {msg}
  </li>
)

export default Comment
