export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Safari Test Page</h1>
      <p>If you can see this, the basic page works.</p>
      <button onClick={() => alert('Button works!')}>
        Test Button
      </button>
    </div>
  );
}