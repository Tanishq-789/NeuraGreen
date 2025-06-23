import { useUser, SignOutButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        gap: '1.5rem',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Welcome, {user.firstName} 👋
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '500px' }}>
        Ready to check the carbon footprint of your favorite products? Let’s get started!
      </p>
      <button
        onClick={() => navigate('/home')}
        style={{
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#646cff',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease-in-out',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#535bf2')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#646cff')}
      >
        Start
      </button>
      <SignOutButton />
    </div>
  );
}

export default Welcome;
