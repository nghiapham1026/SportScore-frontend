import React, { useEffect, useState } from 'react';
import { getNews } from '../../utils/dataController';

function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await getNews();
        if (response.error) {
          setError(response.error);
        } else {
          setNews(response.articles);
        }
      } catch (err) {
        setError('Failed to fetch predictions');
        console.error('Error in useEffect: ', err);
      }
    }

    fetchNews();
  }, []); // Added dependency array to prevent infinite loop

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {news.length > 0 ? (
        news.map(article => (
          <div key={article._id}>
            <h2>{article.name}</h2>
            <p>Author: {article.author}</p>
            <p>Date: {new Date(article.date).toLocaleDateString()}</p>
            <p><a href={article.link}>Read more</a></p>
            <img src={article.image} alt={article.name} style={{ width: '100%', height: 'auto' }} />
            <p>{article.body}</p>
            <p>Topics: {article.topics.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
}

export default News;
