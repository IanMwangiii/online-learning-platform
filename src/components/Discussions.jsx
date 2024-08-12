import { useEffect, useState } from 'react';
import { fetchDiscussions } from '../api';
import './App.css';

function Discussions() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const discussionsData = await fetchDiscussions();
      setDiscussions(discussionsData);
    };
    fetchData();
  }, []);

  return (
    <div className="discussions">
      <h2>Discussions</h2>
      <ul>
        {discussions.map(discussion => (
          <li key={discussion.id}>
            <h3>{discussion.topic}</h3>
            <p>{discussion.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Discussions;