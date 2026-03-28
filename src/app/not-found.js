export default function NotFound() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#fff'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#2563eb' }}>404</h1>
      <h2>Page Nahi Mila Bhai!</h2>
      <a href="/" style={{ 
        marginTop: '20px', 
        padding: '10px 20px', 
        background: '#2563eb', 
        color: '#fff', 
        borderRadius: '5px',
        textDecoration: 'none'
      }}>
        Home Par Wapas Chalo
      </a>
    </div>
  );
}