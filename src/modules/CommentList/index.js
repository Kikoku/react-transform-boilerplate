import React from 'react';
import Comment from '../Comment';

const CommentList = ({messages}) => (
  <ul>
    {
      messages.map((message, i) => (
        <Comment user={message.user} msg={message.msg} key={i} />
      ))
    }
  </ul>
)

export default CommentList;
