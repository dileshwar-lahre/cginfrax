'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ 
        height: '100vh', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' 
      }}>
        <h2 style={{ color: '#f97316' }}>CG INFRAX - System Error</h2>
        <p>Bhai, kuch load nahi ho pa raha. Ek baar refresh karo.</p>
        <button 
          onClick={() => reset()}
          style={{ padding: '10px 20px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}