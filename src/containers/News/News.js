import React, { useEffect, useState } from 'react';
import { getNews } from '../../utils/dataController';
import styles from './News.module.css'; // Import the CSS module

function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({}); // State to track expanded articles

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await getNews();
        if (response.error) {
          setError(response.error);
        } else {
          setNews(response.articles);
          // Initialize all articles as not expanded
          let initExpanded = {};
          response.articles.forEach((article) => {
            initExpanded[article._id] = false;
          });
          setExpanded(initExpanded);
        }
      } catch (err) {
        setError('Failed to fetch predictions');
        console.error('Error in useEffect: ', err);
      }
    }

    fetchNews();
  }, []);

  // Toggle function for Read More/Show Less
  const toggleReadMore = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className={styles.newsContainer}>
      {error && <p className={styles.error}>Error: {error}</p>}
      {news.length > 0 ? (
        news.map((article) => (
          <div key={article._id} className={styles.article}>
            <h2 className={styles.articleTitle}>{article.name}</h2>
            <p className={styles.articleMeta}>Author: {article.author}</p>
            <p className={styles.articleMeta}>
              Date: {new Date(article.date).toLocaleDateString()}
            </p>
            <p>
              <a href={article.link} className={styles.articleLink}>
                Link to article
              </a>
            </p>
            <img
              src={article.image}
              alt={article.name}
              className={styles.articleImage}
            />
            <p className={styles.articleBody}>
              {expanded[article._id]
                ? article.body
                : `${article.body.substring(0, 100)}...`}
            </p>
            <button
              onClick={() => toggleReadMore(article._id)}
              className={styles.readMoreButton}
            >
              {expanded[article._id] ? 'Show Less' : 'Read More'}
            </button>
            <p className={styles.articleMeta}>
              Topics: {article.topics.join(', ')}
            </p>
          </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
}

export default News;
