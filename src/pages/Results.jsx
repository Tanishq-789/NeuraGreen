import { useEffect, useState } from 'react';

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('resultData');
    if (data) {
      try {
        setResults(JSON.parse(data));
      } catch (err) {
        console.error('Failed to parse results:', err);
      }
    }
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#222' }}>
        🥇 Top 3 Low-Carbon Products
      </h1>

      {results.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          No data available. Please go back and try another product.
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {results.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: '300px',
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '16px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                textAlign: 'left',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={item.Image || item.image || 'https://via.placeholder.com/300x200'}
                alt={item.Title || item.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid #ddd',
                  marginBottom: '1rem',
                }}
              />
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
                <a
                  href={item.URL || item.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#0056b3',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {item.Title || item.name}
                </a>
              </h3>
              <p style={{ margin: '0.3rem 0', color: '#444' }}>
                <strong>💰 Price:</strong> {item.Price || 'N/A'}
              </p>
              <p style={{ margin: '0.3rem 0', color: '#2e7d32' }}>
                <strong>🌿 Carbon Score:</strong> {item.CarbonFootprintScore || item.carbon_score || 'N/A'}
              </p>
              {(item.URL || item.url) && (
                <a
                  href={item.URL || item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    color: '#007bff',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                  }}
                >
                  🔗 View on Amazon →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;

// import { useEffect, useState } from 'react';
//
// function Results() {
//   const [results, setResults] = useState([]);
//
//   useEffect(() => {
//     const data = localStorage.getItem('resultData');
//     if (data) {
//       try {
//         setResults(JSON.parse(data));
//       } catch (err) {
//         console.error('Failed to parse results:', err);
//       }
//     }
//   }, []);
//
//   return (
//     <div
//       style={{
//         padding: '2rem',
//         textAlign: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f0f2f5',
//         fontFamily: 'Segoe UI, sans-serif',
//       }}
//     >
//       <h1 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#222' }}>
//         🥇 Top 3 Low-Carbon Products
//       </h1>
//
//       {results.length === 0 ? (
//         <p style={{ fontSize: '1.1rem', color: '#555' }}>
//           No data available. Please go back and try another product.
//         </p>
//       ) : (
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '2rem',
//             flexWrap: 'wrap',
//           }}
//         >
//           {results.map((item, idx) => (
//             <div
//               key={idx}
//               style={{
//                 width: '300px',
//                 backgroundColor: '#fff',
//                 padding: '1rem',
//                 borderRadius: '16px',
//                 boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
//                 textAlign: 'left',
//                 transition: 'transform 0.3s ease',
//               }}
//               onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
//               onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
//             >
//               <img
//                 src={item.Image || item.image || 'https://via.placeholder.com/300x200'}
//                 alt={item.Title || item.name}
//                 style={{
//                   width: '100%',
//                   height: '200px',
//                   objectFit: 'cover',
//                   borderRadius: '12px',
//                   border: '1px solid #ddd',
//                   marginBottom: '1rem',
//                 }}
//               />
//               <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem', color: '#333' }}>
//                 {item.Title || item.name}
//               </h3>
//               <p style={{ margin: '0.3rem 0', color: '#444' }}>
//                 <strong>💰 Price:</strong> {item.Price || 'N/A'}
//               </p>
//               <p style={{ margin: '0.3rem 0', color: '#2e7d32' }}>
//                 <strong>🌿 Carbon Score:</strong> {item.CarbonFootprintScore || item.carbon_score || 'N/A'}
//               </p>
//               {item.url && (
//                 <a
//                   href={item.url}
//                   target="_blank"
//                   rel="noreferrer"
//                   style={{
//                     display: 'inline-block',
//                     marginTop: '0.5rem',
//                     color: '#007bff',
//                     fontWeight: 'bold',
//                     textDecoration: 'none',
//                   }}
//                 >
//                   🔗 View on Amazon →
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
//
// export default Results;
