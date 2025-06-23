// src/pages/Home.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeProduct } from '../api/productApi';

function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await analyzeProduct(query);
      localStorage.setItem('resultData', JSON.stringify(res));
      navigate('/results');
    } catch (err) {
      console.error('Error analyzing product:', err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '2rem' }}>Carbon Footprint Analyzer</h1>
      <p>Enter a product name and we’ll find the top 3 low-carbon alternatives from Amazon.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="e.g. eco-friendly laptop"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '320px',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
    </div>
  );
}

export default Home;
