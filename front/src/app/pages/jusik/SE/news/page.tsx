'use client';

import { useEffect, useState, CSSProperties } from 'react';
import axios from 'axios';

interface News {
  imgLink: string;
  title: string;
  content: string;
  imgSrc: string;
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/news/list'); 
        console.log(response.data); 
        setNews(response.data);
      } catch (error) {
        setError('Failed to load news data');
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Education NEWS</h1>
      <div style={styles.newsContainer}>
        {loading ? (
          <p>Loading news...</p>
        ) : error ? (
          <p>{error}</p>
        ) : news.length > 0 ? (
          <div style={styles.newsGrid}>
            {news.map((item, index) => (
              <div key={index} style={styles.newsCard}>
                <a href={item.imgLink} target="_blank" rel="noopener noreferrer" style={styles.imageLink}>
                  <img src={item.imgSrc} alt={item.title} style={styles.image} />
                </a>
                <div style={styles.cardContent}>
                  <a href={item.imgLink} target="_blank" rel="noopener noreferrer" style={styles.title}>
                    {item.title}
                  </a>
                  <p style={styles.content}>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No news available.</p>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    maxWidth: '1200px',
    margin: 'auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  newsContainer: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    overflowY: 'auto'
  },
  newsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center'
  },
  newsCard: {
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
  },
  imageLink: {
    display: 'block'
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
  },
  cardContent: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000',
    textDecoration: 'none',
    marginBottom: '10px'
  },
  content: {
    fontSize: '14px',
    color: '#666',
    flexGrow: 1
  }
};

export default NewsPage;