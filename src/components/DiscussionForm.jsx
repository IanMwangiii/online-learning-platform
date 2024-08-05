import React, { useState } from 'react';

function DiscussionForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form className="discussion-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Your message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default DiscussionForm;
