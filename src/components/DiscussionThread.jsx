import React from 'react';

function DiscussionThread({ thread }) {
  return (
    <div className="discussion-thread">
      <h3 className="thread-title">{thread.title}</h3>
      <p className="thread-content">{thread.content}</p>
      <div className="thread-comments">
        {/* Render comments here */}
      </div>
    </div>
  );
}

export default DiscussionThread;
