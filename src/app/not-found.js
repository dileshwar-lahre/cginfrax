// ✅ Sabse zaroori line: Build worker ko is page ko static banane se rokne ke liye
export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyChild: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#fff',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '5rem', fontWeight: 'bold', color: '#2563eb', margin: '0' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '10px' }}>
        Page Nahi Mila Bhai!
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '25px' }}>
        Lagta hai aap galat raste par aa gaye hain.
      </p>
      <a href="/" style={{ 
        padding: '12px 24px', 
        background: '#2563eb', 
        color: '#fff', 
        borderRadius: '50px',
        fontWeight: 'bold',
        textDecoration: 'none',
        boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
        transition: 'transform 0.2s'
      }}>
        Home Par Wapas Chalo
      </a>
    </div>
  );
}
